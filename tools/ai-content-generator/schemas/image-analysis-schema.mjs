export const imageAnalysisSchema = {
  type: "object",
  required: ["images", "overallConfidence"],
  properties: {
    images: {
      type: "array",
      items: {
        type: "object",
        required: [
          "fileName",
          "objects",
          "atmosphere",
          "colors",
          "environment",
          "activities",
          "confidence",
        ],
        properties: {
          fileName: { type: "string" },
          objects: { type: "array", items: { type: "string" } },
          atmosphere: { type: "array", items: { type: "string" } },
          colors: { type: "array", items: { type: "string" } },
          environment: { type: "array", items: { type: "string" } },
          activities: { type: "array", items: { type: "string" } },
          confidence: { type: "number" },
        },
      },
    },
    overallConfidence: { type: "number" },
    limitations: { type: "array", items: { type: "string" } },
  },
};
