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
  qualityReport,
  usage,
  generatedFiles,
}) {
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

## Vision Statistics

- Images analyzed: ${analysis.images?.length || 0}
- Overall confidence: ${analysis.overallConfidence ?? "not reported"}
- Limitations: ${(analysis.limitations || []).join("; ") || "none reported"}

## Token / Output Statistics

- Total tokens: ${usage?.total_tokens ?? "not reported"}

## Quality Gate

- Passed: ${qualityReport.passed ? "yes" : "no"}
- Errors: ${qualityReport.errors.length ? qualityReport.errors.join("; ") : "none"}
- Warnings: ${qualityReport.warnings.length ? qualityReport.warnings.join("; ") : "none"}

## Generated Files

${generatedFiles.map((file) => `- \`${file}\``).join("\n")}

## Next Step

If the quality gate passed, manually review \`recommendation.json\` for editorial usefulness before publishing or copying it into recommendation data.
`;

  await writeFile(path.join(outputDir, "REVIEW.md"), review);
}
