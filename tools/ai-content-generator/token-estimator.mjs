export function estimateTokens(value) {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

function average(values) {
  const clean = values.filter((value) => typeof value === "number");
  if (clean.length === 0) return 0;
  return Math.ceil(clean.reduce((sum, value) => sum + value, 0) / clean.length);
}

export function summarizeTokenEstimates(batchEstimates) {
  const averagePromptTokens = average(batchEstimates.map((batch) => batch.promptTokens));
  const averageImageAnalysisTokens = average(
    batchEstimates.map((batch) => batch.imageAnalysisTokens),
  );
  const estimatedTotalTokens = batchEstimates.reduce(
    (sum, batch) => sum + batch.promptTokens + batch.imageAnalysisTokens,
    0,
  );
  const maxPromptTokens = Math.max(0, ...batchEstimates.map((batch) => batch.promptTokens));

  return {
    averagePromptTokens,
    averageImageAnalysisTokens,
    estimatedTotalTokens,
    maxPromptTokens,
    contextWindow: 2048,
    safelyBelowContextWindow: maxPromptTokens < 1200,
    method: "rough character estimate, ceil(characters / 4), prompt includes schema text",
    batches: batchEstimates,
  };
}
