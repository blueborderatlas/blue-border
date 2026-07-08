const TRUST_STATUSES = new Set(["Recommended", "Under Review", "Blue Verified", "Personally Visited"]);
const VALID_CATEGORIES = new Set([
  "ATM",
  "Accommodation",
  "Beach",
  "Cafe",
  "Coffee",
  "Diving",
  "Food",
  "Housing",
  "Local Experience",
  "Local Guide",
  "Nature",
  "Pharmacy",
  "Restaurant",
  "Safety",
  "SIM Card",
  "Stay",
  "Study",
  "Transport",
  "Transportation",
]);
const PLACEHOLDER_VALUES = new Set([
  "todo",
  "tbd",
  "placeholder",
  "unknown",
  "n/a",
  "image.jpg",
  "",
]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function asCleanStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(isNonEmptyString).map((item) => item.trim());
}

function normalizeTags(tags, fallbackTags) {
  const cleanTags = asCleanStringArray(tags)
    .map((tag) => tag.toLowerCase().replace(/[^a-z0-9 -]/g, "").trim())
    .filter(Boolean);

  return Array.from(new Set([...cleanTags, ...fallbackTags])).slice(0, 10);
}

function includesRiskyClaim(text) {
  const normalized = text.toLowerCase();
  return [
    "island of dubrovnik",
    "on the island of dubrovnik",
    "best in",
    "must-visit",
    "hidden gem",
    "perfect for everyone",
  ].some((claim) => normalized.includes(claim));
}

function isPlaceholder(value) {
  return typeof value === "string" && PLACEHOLDER_VALUES.has(value.trim().toLowerCase());
}

function hasDuplicateText(values) {
  const clean = values
    .filter(isNonEmptyString)
    .map((value) => value.trim().toLowerCase().replace(/\s+/g, " "));
  return new Set(clean).size !== clean.length;
}

function validateStringArray({ value, field, min, max, errors }) {
  if (!Array.isArray(value)) {
    errors.push(`${field} must be an array.`);
    return;
  }

  if (value.length < min || value.length > max) {
    errors.push(`${field} must contain ${min}-${max} items.`);
  }

  value.forEach((item, index) => {
    if (!isNonEmptyString(item)) {
      errors.push(`${field}[${index}] must be a non-empty string.`);
    }
  });
}

function getConfidence(analysis) {
  if (typeof analysis?.overallConfidence === "number") return analysis.overallConfidence;
  const values = (analysis?.images || [])
    .map((image) => image.confidence)
    .filter((value) => typeof value === "number");
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function prepareRecommendation({ rawRecommendation, args, images, analysis, minConfidence = 0.5 }) {
  const sourceFiles = new Set(images.map((image) => image.fileName));
  const fallbackTags = [
    args.destination,
    args.country,
    args.category,
    "blue",
    "under review",
  ]
    .filter(Boolean)
    .map((tag) => tag.toLowerCase());

  const normalized = {
    ...rawRecommendation,
    destination: args.destination,
    country: args.country,
    category: args.category,
    trustStatus: TRUST_STATUSES.has(rawRecommendation?.trustStatus)
      ? rawRecommendation.trustStatus
      : "Under Review",
    suggestedGallery: asCleanStringArray(rawRecommendation?.suggestedGallery)
      .filter((fileName) => sourceFiles.has(fileName))
      .slice(0, 8),
    tags: normalizeTags(rawRecommendation?.tags, fallbackTags),
  };

  if (normalized.suggestedGallery.length === 0) {
    normalized.suggestedGallery = images.map((image) => image.fileName).slice(0, 8);
  }

  const errors = [];
  const warnings = [];

  for (const field of ["title", "destination", "country", "category", "summary", "trustStatus"]) {
    if (!isNonEmptyString(normalized[field])) {
      errors.push(`${field} must be a non-empty string.`);
    } else if (isPlaceholder(normalized[field])) {
      errors.push(`${field} contains a placeholder value.`);
    }
  }

  if (!VALID_CATEGORIES.has(normalized.category)) {
    errors.push(`category "${normalized.category}" is not allowed.`);
  }

  if (normalized.title === args.destination) {
    warnings.push("title is generic and only repeats the destination.");
  }

  if (normalized.summary && normalized.summary.length < 120) {
    warnings.push("summary is short; production output should feel more editorial.");
  }

  validateStringArray({
    value: normalized.whyBlueRecommends,
    field: "whyBlueRecommends",
    min: 3,
    max: 5,
    errors,
  });
  validateStringArray({ value: normalized.bestFor, field: "bestFor", min: 3, max: 5, errors });
  validateStringArray({
    value: normalized.thingsToKnow,
    field: "thingsToKnow",
    min: 4,
    max: 6,
    errors,
  });
  validateStringArray({
    value: normalized.suggestedGallery,
    field: "suggestedGallery",
    min: 1,
    max: 8,
    errors,
  });
  validateStringArray({ value: normalized.tags, field: "tags", min: 5, max: 10, errors });

  const proseFields = [
    normalized.title,
    normalized.summary,
    ...asCleanStringArray(normalized.whyBlueRecommends),
    ...asCleanStringArray(normalized.bestFor),
    ...asCleanStringArray(normalized.thingsToKnow),
  ];

  if (hasDuplicateText(proseFields)) {
    errors.push("Output contains duplicated text.");
  }

  for (const [index, value] of proseFields.entries()) {
    if (isPlaceholder(value)) {
      errors.push(`Output prose field ${index} contains a placeholder value.`);
    }
  }

  if (proseFields.some(includesRiskyClaim)) {
    errors.push("Output contains risky or unsupported travel-guide claims.");
  }

  const confidence = getConfidence(analysis);
  if (confidence < minConfidence) {
    errors.push(`image analysis confidence ${confidence.toFixed(2)} is below threshold ${minConfidence}.`);
  }

  if (!Array.isArray(analysis?.images) || analysis.images.length === 0) {
    errors.push("image analysis is missing image facts.");
  }

  return {
    recommendation: normalized,
    report: {
      passed: errors.length === 0,
      errors,
      warnings,
      confidence,
      minConfidence,
      validCategories: Array.from(VALID_CATEGORIES).sort(),
      normalizedFields: ["destination", "country", "category", "trustStatus", "suggestedGallery", "tags"],
    },
  };
}
