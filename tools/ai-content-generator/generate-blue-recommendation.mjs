#!/usr/bin/env node

import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createRecommendationFromImageAnalysis } from "./blue-content-generator.mjs";
import { generateImageAnalysis, validateProviderConfiguration } from "./providers/index.mjs";
import { prepareRecommendation } from "./quality-control.mjs";
import { writeRunLog, writeRunReview } from "./run-review.mjs";
import { imageAnalysisSchema } from "./schemas/image-analysis-schema.mjs";

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

  const prompt = template
    .replaceAll("{{destination}}", args.destination || "Unknown")
    .replaceAll("{{country}}", args.country || "Unknown")
    .replaceAll("{{category}}", args.category || "Unspecified")
    .replaceAll("{{notes}}", args.notes || "No additional notes provided.");

  const manifestText = imageManifest.images
    .map((image, index) => `${index + 1}. ${image.fileName} (${image.mimeType})`)
    .join("\n");

  return `${prompt}

Provided image filenames:

${manifestText}
`;
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
  await mkdir(outputDir, { recursive: true });
  logEntries.push({ time: new Date().toISOString(), message: "Created output folder." });

  const imageManifest = await collectImages(photosDir);

  if (imageManifest.images.length === 0) {
    throw new Error("No supported images found. Use jpg, jpeg, png, webp or non-animated gif files.");
  }

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

  const { provider, model, response, analysis, usage } = await generateImageAnalysis({
    providerName: args.provider,
    model: args.model,
    prompt,
    images: imageManifest.images,
    detail: args.detail,
    schema: imageAnalysisSchema,
  });
  logEntries.push({ time: new Date().toISOString(), message: "Structured image analysis completed." });

  await writeFile(path.join(outputDir, "response.json"), `${JSON.stringify(response, null, 2)}\n`);
  await writeFile(
    path.join(outputDir, "image-analysis.json"),
    `${JSON.stringify(analysis, null, 2)}\n`,
  );

  const rawRecommendation = createRecommendationFromImageAnalysis({
    args,
    images: imageManifest.images,
    analysis,
  });
  logEntries.push({ time: new Date().toISOString(), message: "Blue content generated from image facts." });

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
    qualityReport: report,
    usage,
    generatedFiles,
  });

  console.log(`Blue recommendation JSON saved to ${path.join(outputDir, "recommendation.json")}`);
  console.log(`Prompt saved to ${path.join(outputDir, "prompt.md")}`);
  console.log(`Provider response saved to ${path.join(outputDir, "response.json")}`);
  console.log(`Structured image analysis saved to ${path.join(outputDir, "image-analysis.json")}`);
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
