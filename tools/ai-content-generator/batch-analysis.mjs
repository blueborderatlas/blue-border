export function chunkImages(images, batchSize) {
  const chunks = [];
  for (let index = 0; index < images.length; index += batchSize) {
    chunks.push(images.slice(index, index + batchSize));
  }
  return chunks;
}

export function createBatchManifest(batchImages, batchIndex) {
  return {
    images: batchImages,
    skipped: [],
    totalSupported: batchImages.length,
    batch: {
      index: batchIndex + 1,
      fileNames: batchImages.map((image) => image.fileName),
    },
  };
}

function average(values) {
  const clean = values.filter((value) => typeof value === "number");
  if (clean.length === 0) return 0;
  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

export function mergeImageAnalyses(batchAnalyses) {
  const images = batchAnalyses.flatMap((batch) => batch.analysis.images || []);
  const limitations = Array.from(
    new Set(batchAnalyses.flatMap((batch) => batch.analysis.limitations || []).filter(Boolean)),
  );

  return {
    images,
    overallConfidence: average(
      batchAnalyses.map((batch) =>
        typeof batch.analysis.overallConfidence === "number"
          ? batch.analysis.overallConfidence
          : average((batch.analysis.images || []).map((image) => image.confidence)),
      ),
    ),
    limitations,
    batches: batchAnalyses.map((batch) => ({
      index: batch.index,
      fileNames: batch.fileNames,
      imageCount: batch.analysis.images?.length || 0,
      overallConfidence: batch.analysis.overallConfidence ?? null,
    })),
  };
}

export function formatBatchFileName(index) {
  return `image-analysis-${String(index + 1).padStart(3, "0")}.json`;
}
