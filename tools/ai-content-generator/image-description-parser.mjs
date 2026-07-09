const OBJECT_KEYWORDS = [
  "air tank",
  "backpack",
  "boat",
  "building",
  "camera",
  "car",
  "chair",
  "coral",
  "diver",
  "diving gear",
  "fish",
  "fins",
  "mask",
  "mountain",
  "person",
  "reef",
  "road",
  "rock",
  "sand",
  "sea",
  "shore",
  "sign",
  "sky",
  "street",
  "table",
  "tank",
  "vehicle",
  "water",
  "wetsuit",
];

const ACTIVITY_KEYWORDS = [
  "boating",
  "diving",
  "floating",
  "photographing",
  "riding",
  "sitting",
  "snorkeling",
  "standing",
  "swimming",
  "walking",
];

const ENVIRONMENT_KEYWORDS = [
  "beach",
  "coastal",
  "desert",
  "harbor",
  "indoor",
  "marina",
  "mountain",
  "outdoor",
  "reef",
  "rocky",
  "sea",
  "shore",
  "street",
  "town",
  "underwater",
  "waterfront",
];

const COLOR_KEYWORDS = [
  "black",
  "blue",
  "brown",
  "clear",
  "gray",
  "green",
  "orange",
  "red",
  "turquoise",
  "white",
  "yellow",
];

const NEGATIVE_TEXT_PATTERNS = [
  "no visible text",
  "no text",
  "cannot read",
  "not readable",
  "no readable text",
];

function normalizeText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(values) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function sentenceCase(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getSentences(description) {
  return normalizeText(description)
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function collectKeywordMatches(description, keywords) {
  const normalized = normalizeText(description).toLowerCase();
  return keywords.filter((keyword) => {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(normalized);
  });
}

function extractVisibleText(description) {
  const normalized = normalizeText(description);
  const lower = normalized.toLowerCase();

  if (NEGATIVE_TEXT_PATTERNS.some((pattern) => lower.includes(pattern))) {
    return [];
  }

  const quoted = [...normalized.matchAll(/["“”']([^"“”']{2,80})["“”']/g)].map((match) => match[1]);
  const textMentions = [...normalized.matchAll(/(?:text|sign|wording|letters?)\s+(?:says|reads|shows|visible)[:\s]+([^.!?]+)/gi)].map(
    (match) => match[1],
  );

  return unique([...quoted, ...textMentions]).slice(0, 6);
}

function inferScene(description) {
  const sentences = getSentences(description);
  return sentenceCase(sentences[0] || "The image contains limited visible detail.");
}

function estimateConfidence(parsed) {
  const evidenceCount =
    parsed.objects.length +
    parsed.activities.length +
    parsed.environment.length +
    parsed.visible_text.length;

  if (evidenceCount >= 8) return 0.85;
  if (evidenceCount >= 5) return 0.75;
  if (evidenceCount >= 3) return 0.65;
  if (evidenceCount >= 1) return 0.45;
  return 0.2;
}

export function parseImageDescription({ fileName, description }) {
  const parsed = {
    scene: inferScene(description),
    objects: collectKeywordMatches(description, OBJECT_KEYWORDS),
    activities: collectKeywordMatches(description, ACTIVITY_KEYWORDS),
    environment: collectKeywordMatches(description, ENVIRONMENT_KEYWORDS),
    visible_text: extractVisibleText(description),
  };
  const colors = collectKeywordMatches(description, COLOR_KEYWORDS);

  return {
    fileName,
    rawDescription: normalizeText(description),
    ...parsed,
    atmosphere: parsed.scene ? [parsed.scene] : [],
    colors,
    confidence: estimateConfidence(parsed),
  };
}

export function createImageAnalysisFromDescriptions(descriptionResults) {
  const images = descriptionResults.map((result) =>
    parseImageDescription({
      fileName: result.fileName,
      description: result.description,
    }),
  );
  const confidenceValues = images
    .map((image) => image.confidence)
    .filter((value) => typeof value === "number");
  const overallConfidence =
    confidenceValues.length === 0
      ? 0
      : confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length;

  return {
    images,
    overallConfidence,
    limitations: images
      .filter((image) => image.confidence < 0.5)
      .map((image) => `${image.fileName} produced limited observable facts.`),
  };
}
