export const imageAnalysisSchema = {
  type: "object",
  additionalProperties: false,
  required: ["images", "overallConfidence", "limitations"],
  properties: {
    images: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "fileName",
          "objects",
          "atmosphere",
          "colors",
          "environment",
          "activities",
          "confidence",
          "notes",
        ],
        properties: {
          fileName: { type: "string" },
          objects: {
            type: "array",
            items: { type: "string" },
          },
          atmosphere: {
            type: "array",
            items: { type: "string" },
          },
          colors: {
            type: "array",
            items: { type: "string" },
          },
          environment: {
            type: "array",
            items: { type: "string" },
          },
          activities: {
            type: "array",
            items: { type: "string" },
          },
          confidence: {
            type: "number",
            minimum: 0,
            maximum: 1,
          },
          notes: { type: "string" },
        },
      },
    },
    overallConfidence: {
      type: "number",
      minimum: 0,
      maximum: 1,
    },
    limitations: {
      type: "array",
      items: { type: "string" },
    },
  },
};
