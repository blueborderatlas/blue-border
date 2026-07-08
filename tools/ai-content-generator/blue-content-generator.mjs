const GENERIC_BEST_FOR = {
  Stay: ["Independent travelers", "Couples", "Slow travelers"],
  Coffee: ["Independent travelers", "Remote workers", "Quiet morning people"],
  Food: ["Independent travelers", "Couples", "Slow travelers"],
  Restaurant: ["Independent travelers", "Couples", "Small groups"],
  Diving: ["Divers", "Independent travelers", "Slow travelers"],
  Nature: ["Walkers", "Solo travelers", "Slow travelers"],
  "Local Experience": ["Independent travelers", "Slow walkers", "Editorial research"],
};

function unique(values) {
  return Array.from(new Set(values.filter(Boolean).map((value) => value.trim()).filter(Boolean)));
}

function sentenceList(values, fallback) {
  const clean = unique(values);
  if (clean.length === 0) return fallback;
  if (clean.length === 1) return clean[0];
  return `${clean.slice(0, -1).join(", ")} and ${clean.at(-1)}`;
}

function collectFacts(analysis, key) {
  return unique((analysis.images || []).flatMap((image) => image[key] || []));
}

function getPrimaryFact(analysis, key, fallback) {
  return collectFacts(analysis, key)[0] || fallback;
}

function getAverageConfidence(analysis) {
  if (typeof analysis.overallConfidence === "number") return analysis.overallConfidence;
  const values = (analysis.images || [])
    .map((image) => image.confidence)
    .filter((value) => typeof value === "number");
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function buildTitle({ args, analysis }) {
  const environment = getPrimaryFact(analysis, "environment", "Visual Note");
  const atmosphere = getPrimaryFact(analysis, "atmosphere", "Under Review");
  return `${args.destination} ${args.category}: ${atmosphere} ${environment}`.replace(/\s+/g, " ");
}

function buildSummary({ args, analysis }) {
  const objects = sentenceList(collectFacts(analysis, "objects").slice(0, 4), "limited visible details");
  const atmosphere = sentenceList(
    collectFacts(analysis, "atmosphere").slice(0, 3),
    "a quiet, observational atmosphere",
  );
  const environment = sentenceList(
    collectFacts(analysis, "environment").slice(0, 3),
    "the surrounding environment",
  );

  return `Based on the available photos, this ${args.category.toLowerCase()} note in ${
    args.destination
  } is built around visible cues such as ${objects}. The atmosphere reads as ${atmosphere}, with ${environment} providing the main context; it should remain under review until a human editor confirms the exact place and practical details.`;
}

function buildReasons({ analysis }) {
  const objects = sentenceList(collectFacts(analysis, "objects").slice(0, 3), "clear visual cues");
  const atmosphere = sentenceList(
    collectFacts(analysis, "atmosphere").slice(0, 3),
    "a calm travel atmosphere",
  );
  const environment = sentenceList(
    collectFacts(analysis, "environment").slice(0, 3),
    "a readable local setting",
  );
  const colors = sentenceList(collectFacts(analysis, "colors").slice(0, 3), "natural light and color");

  return [
    `The image evidence gives a readable sense of place through ${objects}.`,
    `The atmosphere appears ${atmosphere}, which fits Blue's slower editorial style.`,
    `The surrounding context suggests ${environment}, useful for independent travelers assessing a place before visiting.`,
    `The visual palette includes ${colors}, giving the recommendation a clear photographic reference for future review.`,
  ];
}

function buildThingsToKnow({ analysis }) {
  const limitations = unique(analysis.limitations || []);
  return [
    "This recommendation is generated from visual evidence and should be reviewed by a human editor before publishing.",
    "Exact address, opening hours, prices and contact details are not inferred from the photos.",
    "Use the listed gallery filenames only as draft image suggestions.",
    limitations[0] || "The image set may not show enough detail to confirm the full traveler experience.",
  ];
}

function buildTags({ args, analysis }) {
  return unique([
    args.destination.toLowerCase(),
    args.country.toLowerCase(),
    args.category.toLowerCase(),
    ...collectFacts(analysis, "environment").slice(0, 2).map((tag) => tag.toLowerCase()),
    ...collectFacts(analysis, "atmosphere").slice(0, 2).map((tag) => tag.toLowerCase()),
    "blue",
    "under review",
  ]).slice(0, 10);
}

export function createRecommendationFromImageAnalysis({ args, analysis, images }) {
  const confidence = getAverageConfidence(analysis);

  return {
    title: buildTitle({ args, analysis }),
    destination: args.destination,
    country: args.country,
    category: args.category,
    summary: buildSummary({ args, analysis }),
    whyBlueRecommends: buildReasons({ analysis }),
    bestFor: GENERIC_BEST_FOR[args.category] || [
      "Independent travelers",
      "Slow travelers",
      "Editorial research",
    ],
    thingsToKnow: buildThingsToKnow({ analysis }),
    trustStatus: confidence >= 0.7 ? "Under Review" : "Under Review",
    suggestedGallery: images.map((image) => image.fileName).slice(0, 8),
    tags: buildTags({ args, analysis }),
  };
}
