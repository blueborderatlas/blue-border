import { extractJson, toBase64Images } from "./image-inputs.mjs";

export const geminiProvider = {
  name: "gemini",
  defaultModel: "gemini-2.5-flash",

  async generateRecommendation({ apiKey, model, prompt, images, schema }) {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is required when provider is gemini.");
    }

    const base64Images = await toBase64Images(images);
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${prompt}\n\nReturn only valid JSON matching this schema:\n${JSON.stringify(
                  schema,
                  null,
                  2,
                )}`,
              },
              ...base64Images.map((image) => ({
                inlineData: {
                  mimeType: image.mimeType,
                  data: image.base64,
                },
              })),
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(`Gemini request failed (${response.status}): ${JSON.stringify(body, null, 2)}`);
    }

    const text = body.candidates?.[0]?.content?.parts?.find((part) => part.text)?.text;

    return {
      recommendation: extractJson(text),
      response: body,
      usage: body.usageMetadata
        ? {
            input_tokens: body.usageMetadata.promptTokenCount ?? null,
            output_tokens: body.usageMetadata.candidatesTokenCount ?? null,
            total_tokens: body.usageMetadata.totalTokenCount ?? null,
          }
        : null,
    };
  },
};
