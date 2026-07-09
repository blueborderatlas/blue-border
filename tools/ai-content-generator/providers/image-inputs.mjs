import { readFile } from "node:fs/promises";

export async function toBase64Images(images) {
  return Promise.all(
    images.map(async (image) => ({
      fileName: image.fileName,
      mimeType: image.mimeType,
      base64: await readFile(image.path, "base64"),
    })),
  );
}

export async function toDataUrlImageParts(images, detail) {
  const base64Images = await toBase64Images(images);

  return base64Images.map((image) => ({
    type: "input_image",
    image_url: `data:${image.mimeType};base64,${image.base64}`,
    detail,
  }));
}

export class JsonExtractionError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "JsonExtractionError";
    this.rawText = details.rawText || "";
    this.cleanedText = details.cleanedText || "";
    this.extractedText = details.extractedText || "";
    this.repairedText = details.repairedText || "";
    this.parseError = details.parseError || "";
  }
}

function cleanModelText(text) {
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

function extractFirstJsonObject(text) {
  const start = text.indexOf("{");
  if (start === -1) return "";

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < text.length; index += 1) {
    const char = text[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;

    if (depth === 0) {
      return text.slice(start, index + 1);
    }
  }

  return text.slice(start);
}

function repairJson(text) {
  return text
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/,\s*([}\]])/g, "$1")
    .trim()
    .concat("\n");
}

export function extractJson(text) {
  if (!text) {
    throw new JsonExtractionError("Provider response did not contain text output.", { rawText: "" });
  }

  const cleanedText = cleanModelText(text);
  const extractedText = extractFirstJsonObject(cleanedText);
  const candidates = [cleanedText, extractedText, repairJson(extractedText)].filter(Boolean);
  let lastError = null;

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch (error) {
      lastError = error;
    }
  }

  throw new JsonExtractionError("Provider response did not contain parseable JSON.", {
    rawText: text,
    cleanedText,
    extractedText,
    repairedText: repairJson(extractedText),
    parseError: lastError?.message || "Unknown JSON parse error",
  });
}
