#!/usr/bin/env node

import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {
  chunkImages,
  createBatchManifest,
  formatBatchFileName,
  mergeImageAnalyses,
} from "./batch-analysis.mjs";
import { createRecommendationFromImageAnalysis } from "./blue-content-generator.mjs";
import { createEditorialObservations } from "./editorial-engine.mjs";
import { createImageAnalysisFromDescriptions } from "./image-description-parser.mjs";
import { generateImageDescription, validateProviderConfiguration } from "./providers/index.mjs";
import { prepareRecommendation } from "./quality-control.mjs";
import { writeRunLog, writeRunReview } from "./run-review.mjs";
import { estimateTokens, summarizeTokenEstimates } from "./token-estimator.mjs";

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const DEFAULT_PROMPT_PATH = path.join(
  "tools",
  "ai-content-generator",
  "prompts",
  "vision-analysis-prompt.md",
);

function parseArgs(argv) {
  const args = {
    provider: process.env.BLUE_AI_PROVIDER || "ollama",
    model: process.env.BLUE_AI_MODEL || "moondream",
    out: path.join("tools", "ai-content-generator", "output"),
    prompt: DEFAULT_PROMPT_PATH,
    detail: "high",
    notes: "",
    minConfidence: "0.5",
    batchSize: "1",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg.startsWith("--")) {
      const key = arg.slice(2);
      if (!next || next.startsWith("--")) {
        throw new Error(`Missing value for --${key}`);
      }
      args[key] = next;
      index += 1;
    }
  }

  return args;
}

function printHelp() {
  console.log(`
Blue AI Content Generator

Usage:
  node tools/ai-content-generator/generate-blue-recommendation.mjs \\
    --photos /path/to/travel-photos \\
    --destination Dahab \\
    --country Egypt \\
    --category Coffee \\
    --provider ollama \\
    --model moondream \\
    --out tools/ai-content-generator/output/dahab-coffee

Options:
  --photos       Required. Folder containing jpg, jpeg, png, webp or non-animated gif images.
  --destination  Required. Destination name, such as Dahab.
  --country      Required. Country name, such as Egypt.
  --category     Required. Category hint for the recommendation.
  --notes        Optional editor notes to guide the model.
  --out          Output folder. Default: tools/ai-content-generator/output
  --provider     Provider name. Sprint 26 production pipeline uses ollama. Default: ollama.
  --model        Provider model. Defaults to provider default, or BLUE_AI_MODEL env var.
  --detail       Vision detail level: low, high, original or auto. Default: high.
  --minConfidence Minimum image-analysis confidence. Default: 0.5.
  --batchSize    Deprecated. The Ollama vision stage always sends one image per request.
`);
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return null;
}

async function collectImages(photosDir) {
  const entries = await readdir(photosDir, { withFileTypes: true });
  const images = [];
  const skipped = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const filePath = path.join(photosDir, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    const mimeType = getMimeType(filePath);

    if (!SUPPORTED_EXTENSIONS.has(ext) || !mimeType) {
      skipped.push({ file: entry.name, reason: "unsupported image type" });
      continue;
    }

    const fileStat = await stat(filePath);
    images.push({
      fileName: entry.name,
      path: filePath,
      mimeType,
      sizeBytes: fileStat.size,
    });
  }

  images.sort((a, b) => a.fileName.localeCompare(b.fileName));

  return {
    images,
    skipped,
    totalSupported: images.length,
  };
}

async function buildPrompt(args, imageManifest) {
  const template = await readFile(args.prompt, "utf8");

  return template
    .replaceAll("{{destination}}", args.destination || "Unknown")
    .replaceAll("{{country}}", args.country || "Unknown")
    .replaceAll("{{category}}", args.category || "Unspecified")
    .replaceAll("{{notes}}", args.notes || "No additional notes provided.");
}

function createPublicManifest(imageManifest) {
  return {
    images: imageManifest.images.map(({ fileName, mimeType, sizeBytes }) => ({
      fileName,
      mimeType,
      sizeBytes,
    })),
    skipped: imageManifest.skipped,
    totalSupported: imageManifest.totalSupported,
  };
}

function validateRequiredArgs(args) {
  const missing = ["photos", "destination", "country", "category"].filter((key) => !args[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required option(s): ${missing.map((key) => `--${key}`).join(", ")}`);
  }
}

function getBatchSize(value) {
  const batchSize = Number(value);
  if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > 4) {
    throw new Error("--batchSize must be an integer between 1 and 4.");
  }
  return batchSize;
}

async function writeParsingFailure({
  outputDir,
  logEntries,
  start,
  args,
  provider,
  model,
  imageManifest,
  error,
  batchIndex,
  batchImages,
  usage,
}) {
  const rawText = error.rawText || "";
  const invalidReport = {
    batch: batchIndex + 1,
    fileNames: batchImages.map((image) => image.fileName),
    error: error.message,
    parseError: error.parseError || error.cause?.message || "",
    cleanedText: error.cleanedText || "",
    extractedText: error.extractedText || "",
    repairedText: error.repairedText || "",
  };
  const qualityReport = {
    passed: false,
    errors: [
      `Image analysis batch ${batchIndex + 1} returned invalid JSON.`,
      error.parseError || error.message,
    ].filter(Boolean),
    warnings: [],
    parsing: invalidReport,
  };
  const analysis = {
    images: [],
    overallConfidence: 0,
    limitations: [`Image analysis batch ${batchIndex + 1} failed JSON parsing.`],
    batches: [
      {
        index: batchIndex + 1,
        fileNames: batchImages.map((image) => image.fileName),
        imageCount: 0,
        overallConfidence: null,
      },
    ],
  };

  logEntries.push({
    time: new Date().toISOString(),
    message: `Image analysis batch ${batchIndex + 1} failed JSON parsing.`,
  });

  await writeFile(path.join(outputDir, "response.raw.txt"), rawText);
  await writeFile(
    path.join(outputDir, "response.invalid.json"),
    `${JSON.stringify(invalidReport, null, 2)}\n`,
  );
  await writeFile(
    path.join(outputDir, "quality-report.json"),
    `${JSON.stringify(qualityReport, null, 2)}\n`,
  );

  if (error.providerResponse) {
    await writeFile(
      path.join(outputDir, "response.json"),
      `${JSON.stringify(error.providerResponse, null, 2)}\n`,
    );
  }

  await writeRunLog({ outputDir, entries: logEntries });
  await writeRunReview({
    outputDir,
    args,
    provider,
    model,
    elapsedMs: Date.now() - start,
    analysis,
    imageManifest: createPublicManifest(imageManifest),
    qualityReport,
    recommendation: null,
    usage,
    generatedFiles: [
      "response.raw.txt",
      "response.invalid.json",
      "response.json",
      "image-manifest.json",
      "prompt.md",
      "quality-report.json",
      "run.log",
      "REVIEW.md",
    ],
  });
}

async function main() {
  const start = Date.now();
  const logEntries = [];
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  validateRequiredArgs(args);
  validateProviderConfiguration(args.provider);
  if (args.provider?.toLowerCase() !== "ollama") {
    throw new Error("Sprint 26 production pipeline only uses the local Ollama provider.");
  }

  const photosDir = path.resolve(args.photos);
  const outputDir = path.resolve(args.out);
  const imageAnalysisDir = path.join(outputDir, "image-analysis");
  await mkdir(outputDir, { recursive: true });
  await mkdir(imageAnalysisDir, { recursive: true });
  logEntries.push({ time: new Date().toISOString(), message: "Created output folder." });

  const imageManifest = await collectImages(photosDir);

  if (imageManifest.images.length === 0) {
    throw new Error("No supported images found. Use jpg, jpeg, png, webp or non-animated gif files.");
  }

  getBatchSize(args.batchSize);
  const batchSize = 1;
  const batches = chunkImages(imageManifest.images, batchSize);
  logEntries.push({
    time: new Date().toISOString(),
    message: `Split ${imageManifest.images.length} image(s) into ${batches.length} batch(es) of up to ${batchSize}.`,
  });

  const prompt = await buildPrompt(args, imageManifest);

  await writeFile(path.join(outputDir, "prompt.md"), prompt);
  await writeFile(
    path.join(outputDir, "image-manifest.json"),
    `${JSON.stringify(createPublicManifest(imageManifest), null, 2)}\n`,
  );
  logEntries.push({
    time: new Date().toISOString(),
    message: `Collected ${imageManifest.images.length} supported image(s).`,
  });

  let provider = args.provider;
  let model = args.model;
  let totalTokens = 0;
  const responses = [];
  const batchAnalyses = [];
  const batchTokenEstimates = [];

  for (let index = 0; index < batches.length; index += 1) {
    const batchImages = batches[index];
    const batchManifest = createBatchManifest(batchImages, index);
    const batchPrompt = await buildPrompt(args, batchManifest);
    const promptTokens = estimateTokens(batchPrompt);

    logEntries.push({
      time: new Date().toISOString(),
      message: `Starting image analysis batch ${index + 1}/${batches.length} with ${
        batchImages.length
      } image(s).`,
    });

    let result;
    try {
      result = await generateImageDescription({
        providerName: args.provider,
        model: args.model,
        prompt: batchPrompt,
        images: batchImages,
        detail: args.detail,
      });
    } catch (error) {
      if (error.name === "JsonExtractionError" || error.rawText) {
        const failedBatchTokenEstimates = [
          ...batchTokenEstimates,
          {
            batch: index + 1,
            imageCount: batchImages.length,
            promptTokens,
            imageAnalysisTokens: estimateTokens(error.extractedText || error.rawText || ""),
          },
        ];
        await writeParsingFailure({
          outputDir,
          logEntries,
          start,
          args,
          provider,
          model,
          imageManifest,
          error,
          batchIndex: index,
          batchImages,
          usage: {
            total_tokens: totalTokens || null,
            tokenEstimates: summarizeTokenEstimates(failedBatchTokenEstimates),
          },
        });
      }
      throw error;
    }

    provider = result.provider;
    model = result.model;
    totalTokens += result.usage?.total_tokens || 0;
    const descriptionResults = batchImages.map((image) => ({
      fileName: image.fileName,
      description: result.description,
    }));
    const analysis = createImageAnalysisFromDescriptions(descriptionResults);

    responses.push({
      batch: index + 1,
      fileNames: batchImages.map((image) => image.fileName),
      description: result.description,
      response: result.response,
      usage: result.usage,
    });
    batchAnalyses.push({
      index: index + 1,
      fileNames: batchImages.map((image) => image.fileName),
      analysis,
    });
    batchTokenEstimates.push({
      batch: index + 1,
      imageCount: batchImages.length,
      promptTokens,
      imageAnalysisTokens: estimateTokens(result.description),
    });

    await writeFile(
      path.join(imageAnalysisDir, `raw-response-${String(index + 1).padStart(3, "0")}.txt`),
      `${result.description.trim()}\n`,
    );
    await writeFile(
      path.join(imageAnalysisDir, formatBatchFileName(index)),
      `${JSON.stringify(analysis, null, 2)}\n`,
    );
    logEntries.push({
      time: new Date().toISOString(),
      message: `Saved image analysis batch ${index + 1}/${batches.length}.`,
    });
  }

  const analysis = mergeImageAnalyses(batchAnalyses);
  const tokenEstimates = summarizeTokenEstimates(batchTokenEstimates);
  const usage = { total_tokens: totalTokens || null, tokenEstimates };

  logEntries.push({ time: new Date().toISOString(), message: "Merged structured image analysis batches." });

  await writeFile(path.join(outputDir, "response.json"), `${JSON.stringify({ responses }, null, 2)}\n`);
  await writeFile(
    path.join(outputDir, "image-analysis.json"),
    `${JSON.stringify(analysis, null, 2)}\n`,
  );

  const editorialObservations = createEditorialObservations(analysis);
  await writeFile(
    path.join(outputDir, "editorial-observations.json"),
    `${JSON.stringify(editorialObservations, null, 2)}\n`,
  );
  logEntries.push({ time: new Date().toISOString(), message: "Editorial observations generated." });

  const rawRecommendation = createRecommendationFromImageAnalysis({
    args,
    images: imageManifest.images,
    analysis,
    editorialObservations,
  });
  logEntries.push({ time: new Date().toISOString(), message: "Blue content generated from editorial observations." });

  const { recommendation, report } = prepareRecommendation({
    rawRecommendation,
    args,
    images: imageManifest.images,
    analysis,
    minConfidence: Number(args.minConfidence),
  });

  await writeFile(
    path.join(outputDir, "quality-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  logEntries.push({
    time: new Date().toISOString(),
    message: `Quality gate ${report.passed ? "passed" : "failed"}.`,
  });

  if (!report.passed) {
    await writeFile(
      path.join(outputDir, "recommendation.invalid.json"),
      `${JSON.stringify(recommendation, null, 2)}\n`,
    );
    const generatedFiles = [
      "recommendation.invalid.json",
      "image-analysis.json",
      "editorial-observations.json",
      "image-analysis/",
      "prompt.md",
      "response.json",
      "image-manifest.json",
      "quality-report.json",
      "run.log",
      "REVIEW.md",
    ];
    await writeRunLog({ outputDir, entries: logEntries });
    await writeRunReview({
      outputDir,
      args,
      provider,
      model,
      elapsedMs: Date.now() - start,
      analysis,
      imageManifest: createPublicManifest(imageManifest),
      qualityReport: report,
      recommendation,
      usage,
      generatedFiles,
    });
    throw new Error(
      `Generated recommendation failed quality checks. See ${path.join(
        outputDir,
        "quality-report.json",
      )}`,
    );
  }

  await writeFile(
    path.join(outputDir, "recommendation.json"),
    `${JSON.stringify(recommendation, null, 2)}\n`,
  );
  logEntries.push({ time: new Date().toISOString(), message: "recommendation.json saved." });

  const generatedFiles = [
    "recommendation.json",
    "image-analysis.json",
    "editorial-observations.json",
    "image-analysis/",
    "prompt.md",
    "response.json",
    "image-manifest.json",
    "quality-report.json",
    "run.log",
    "REVIEW.md",
  ];

  await writeRunLog({ outputDir, entries: logEntries });
  await writeRunReview({
    outputDir,
    args,
    provider,
    model,
    elapsedMs: Date.now() - start,
    analysis,
    imageManifest: createPublicManifest(imageManifest),
    qualityReport: report,
    recommendation,
    usage,
    generatedFiles,
  });

  console.log(`Blue recommendation JSON saved to ${path.join(outputDir, "recommendation.json")}`);
  console.log(`Prompt saved to ${path.join(outputDir, "prompt.md")}`);
  console.log(`Provider response saved to ${path.join(outputDir, "response.json")}`);
  console.log(`Structured image analysis saved to ${path.join(outputDir, "image-analysis.json")}`);
  console.log(`Editorial observations saved to ${path.join(outputDir, "editorial-observations.json")}`);
  console.log(`Run log saved to ${path.join(outputDir, "run.log")}`);
  console.log(`Run review saved to ${path.join(outputDir, "REVIEW.md")}`);
  console.log(`Provider: ${provider}`);
  console.log(`Model: ${model}`);
  console.log(`Images sent: ${imageManifest.images.length}`);
  console.log(`Total token usage: ${usage?.total_tokens ?? "not reported"}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
