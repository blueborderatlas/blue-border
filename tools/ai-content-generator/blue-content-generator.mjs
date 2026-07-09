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

function getAverageConfidence(analysis) {
  if (typeof analysis.overallConfidence === "number") return analysis.overallConfidence;
  const values = (analysis.images || [])
    .map((image) => image.confidence)
    .filter((value) => typeof value === "number");
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function hasAny(values) {
  return Array.isArray(values) && values.length > 0;
}

function getEditorialShape(editorialObservations = {}) {
  return {
    hasUnderwater: hasAny(editorialObservations.underwater),
    hasShore: hasAny(editorialObservations.shore),
    hasEquipment: hasAny(editorialObservations.equipment),
    hasPeople: hasAny(editorialObservations.people),
    hasFacilities: hasAny(editorialObservations.facilities),
    hasText: hasAny(editorialObservations.visibleText),
  };
}

function buildTitle({ args, editorialObservations }) {
  const shape = getEditorialShape(editorialObservations);

  if (args.category === "Diving" && shape.hasUnderwater && shape.hasShore) {
    return `${args.destination} Diving Beyond the Water`;
  }

  if (args.category === "Diving" && shape.hasEquipment) {
    return `A Shore-Based Diving Experience in ${args.destination}`;
  }

  if (shape.hasShore && shape.hasPeople) {
    return `${args.destination}: A Local Travel Note`;
  }

  return `${args.destination} ${args.category}: An Editorial Note`;
}

function buildSummary({ args, editorialObservations }) {
  const shape = getEditorialShape(editorialObservations);

  if (args.category === "Diving" && shape.hasUnderwater && shape.hasShore && shape.hasEquipment) {
    return `${args.destination} feels like a diving experience that begins before the water: reef moments, gear routines, shoreline pauses and small onshore spaces all sit in the same rhythm. It is the kind of place where the preparation, the dive and the return to shore matter together.`;
  }

  if (args.category === "Diving" && shape.hasUnderwater) {
    return `${args.destination} comes across through the reef first, with the water carrying most of the atmosphere. The surrounding details are still limited, so the experience should be read as an early travel note rather than a complete practical guide.`;
  }

  return `${args.destination} comes across as a quiet ${args.category.toLowerCase()} stop shaped by place, routine and small practical details. The atmosphere is useful, but the practical side still needs human checking before it can become a stronger Blue entry.`;
}

function buildReasons({ editorialObservations }) {
  const shape = getEditorialShape(editorialObservations);
  const reasons = [];

  if (shape.hasUnderwater && shape.hasShore) {
    reasons.push("The photos move naturally between reef dives and life on shore, which helps travelers understand the full rhythm of a dive day.");
  }

  if (shape.hasEquipment) {
    reasons.push("The preparation areas suggest an organized diving operation, with gear and setup forming part of the experience rather than staying out of view.");
  }

  if (shape.hasPeople) {
    reasons.push("The presence of divers and small groups gives the place a human scale, closer to a lived travel moment than a polished brochure image.");
  }

  if (shape.hasFacilities) {
    reasons.push("Onshore spaces, storage areas and front-desk details make the practical side easier to imagine before arriving.");
  }

  if (shape.hasUnderwater) {
    reasons.push("The reef and marine-life moments give the entry its main travel pull without needing to invent claims about service or conditions.");
  }

  return [
    ...reasons,
    "The strongest details are practical and atmospheric rather than polished or staged.",
    "The material points to a real travel setting, while service details still need checking.",
  ].slice(0, 4);
}

function buildThingsToKnow({ editorialObservations }) {
  const missing = editorialObservations?.missingInformation || [];
  const visibleText = editorialObservations?.visibleText || [];
  const textNote =
    visibleText.length > 0
      ? `Text visible in the photos includes ${visibleText
          .slice(0, 3)
          .map((text) => `"${text}"`)
          .join(", ")}; this is not a verified business identity.`
      : "No business identity is confirmed from the available material.";

  return [
    missing[0] || "Opening hours not verified",
    missing[1] || "Prices not verified",
    missing[2] || "Instructor quality unknown",
    missing[3] || "Booking process unknown",
    textNote,
  ];
}

function buildTags({ args, analysis, editorialObservations }) {
  const visibleTextTags = (editorialObservations?.visibleText || [])
    .slice(0, 2)
    .map((tag) => tag.toLowerCase());

  return unique([
    args.destination.toLowerCase(),
    args.country.toLowerCase(),
    args.category.toLowerCase(),
    ...collectFacts(analysis, "environment").slice(0, 2).map((tag) => tag.toLowerCase()),
    ...collectFacts(analysis, "objects").slice(0, 2).map((tag) => tag.toLowerCase()),
    ...visibleTextTags,
    "blue",
    "under review",
  ]).slice(0, 10);
}

export function createRecommendationFromImageAnalysis({
  args,
  analysis,
  images,
  editorialObservations,
}) {
  const confidence = getAverageConfidence(analysis);

  return {
    title: buildTitle({ args, editorialObservations }),
    destination: args.destination,
    country: args.country,
    category: args.category,
    summary: buildSummary({ args, editorialObservations }),
    whyBlueRecommends: buildReasons({ editorialObservations }),
    bestFor: GENERIC_BEST_FOR[args.category] || [
      "Independent travelers",
      "Slow travelers",
      "Editorial research",
    ],
    thingsToKnow: buildThingsToKnow({ editorialObservations }),
    trustStatus: confidence >= 0.7 ? "Under Review" : "Under Review",
    suggestedGallery: images.map((image) => image.fileName).slice(0, 8),
    tags: buildTags({ args, analysis, editorialObservations }),
  };
}
