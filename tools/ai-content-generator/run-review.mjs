import { writeFile } from "node:fs/promises";
import path from "node:path";

function formatMs(ms) {
  return `${(ms / 1000).toFixed(2)}s`;
}

export async function writeRunLog({ outputDir, entries }) {
  const lines = entries.map((entry) => `[${entry.time}] ${entry.message}`);
  await writeFile(path.join(outputDir, "run.log"), `${lines.join("\n")}\n`);
}

export async function writeRunReview({
  outputDir,
  args,
  provider,
  model,
  elapsedMs,
  analysis,
  imageManifest,
  qualityReport,
  recommendation,
  usage,
  generatedFiles,
}) {
  const visualFacts = (analysis.images || [])
    .slice(0, 8)
    .map((image) => {
      const facts = [
        ...(image.objects || []).slice(0, 3),
        ...(image.environment || []).slice(0, 2),
        ...(image.atmosphere || []).slice(0, 2),
      ];
      return `- ${image.fileName}: ${facts.join(", ") || "no clear facts reported"} (confidence: ${
        image.confidence ?? "not reported"
      })`;
    })
    .join("\n");

  const skippedFiles = (imageManifest.skipped || [])
    .map((item) => `- ${item.file}: ${item.reason}`)
    .join("\n");

  const manualFields = [
    "title",
    "summary",
    "whyBlueRecommends",
    "bestFor",
    "thingsToKnow",
    "tags",
  ]
    .filter((field) => {
      if (!recommendation) return true;
      const value = recommendation[field];
      if (Array.isArray(value)) return value.length === 0;
      return !value;
    })
    .join(", ");

  const batchLines = (analysis.batches || [])
    .map(
      (batch) =>
        `- Batch ${batch.index}: ${batch.fileNames.join(", ")} (${batch.imageCount} analyzed, confidence: ${
          batch.overallConfidence ?? "not reported"
        })`,
    )
    .join("\n");

  const review = `# Blue AI Content Generator Run Review

Generated: ${new Date().toISOString()}

## Pipeline

Travel Photos -> Vision Model -> Structured Image Analysis -> Blue Content Generator -> Quality Gate -> recommendation.json

## Execution

- Execution time: ${formatMs(elapsedMs)}
- Provider: ${provider}
- Model: ${model}
- Destination: ${args.destination}
- Country: ${args.country}
- Category: ${args.category}

## Images

- Total supported images processed: ${imageManifest.images?.length || 0}
- Skipped files: ${(imageManifest.skipped || []).length}

${skippedFiles || "No skipped files."}

## Vision Statistics

- Images analyzed: ${analysis.images?.length || 0}
- Overall confidence: ${analysis.overallConfidence ?? "not reported"}
- Limitations: ${(analysis.limitations || []).join("; ") || "none reported"}

## Batch Processing

- Total batches: ${analysis.batches?.length || 0}

${batchLines || "No batch information reported."}

## Key Visual Facts Recognized

${visualFacts || "No visual facts were reported."}

## Token / Output Statistics

- Total tokens: ${usage?.total_tokens ?? "not reported"}
- Average prompt tokens: ${usage?.tokenEstimates?.averagePromptTokens ?? "not reported"}
- Average image-analysis tokens: ${
    usage?.tokenEstimates?.averageImageAnalysisTokens ?? "not reported"
  }
- Estimated total tokens: ${usage?.tokenEstimates?.estimatedTotalTokens ?? "not reported"}
- Max prompt tokens per request: ${usage?.tokenEstimates?.maxPromptTokens ?? "not reported"}
- 2048-token safety check: ${
    usage?.tokenEstimates
      ? usage.tokenEstimates.safelyBelowContextWindow
        ? "safely below estimated context window"
        : "risk: prompt may be too large"
      : "not reported"
  }

## Quality Gate

- Result: ${qualityReport.passed ? "Pass" : "Fail"}
- Errors: ${qualityReport.errors.length ? qualityReport.errors.join("; ") : "none"}
- Warnings: ${qualityReport.warnings.length ? qualityReport.warnings.join("; ") : "none"}

## Hallucinations Or Factual Errors

${qualityReport.errors.length ? qualityReport.errors.map((error) => `- ${error}`).join("\n") : "None detected by the automated quality gate."}

## Fields That Require Manual Editing

${manualFields || "All required fields are present. Manual editorial review is still required before publishing."}

## Generated Files

${generatedFiles.map((file) => `- \`${file}\``).join("\n")}

## Suggestions For Improving Future Generations

- Include a mix of wide context photos and close detail photos.
- Add at least one photo showing the diving center, boat, equipment or entry point.
- Avoid too many near-duplicate shots from the same angle.
- Add editor notes with known facts that should not be inferred from images.
- Keep personal faces, receipts and private contact details out of the input folder.

## Next Step

If the quality gate passed, manually review \`recommendation.json\` for editorial usefulness before publishing or copying it into recommendation data.
`;

  await writeFile(path.join(outputDir, "REVIEW.md"), review);
}
