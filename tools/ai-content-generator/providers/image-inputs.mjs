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

export function extractJson(text) {
  if (!text) {
    throw new Error("Provider response did not contain text output.");
  }

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("Provider response did not contain parseable JSON.");
    }

    return JSON.parse(match[0]);
  }
}
