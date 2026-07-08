import { toDataUrlImageParts } from "./image-inputs.mjs";

export const openaiProvider = {
  name: "openai",
  defaultModel: "gpt-5.5",

  async generateRecommendation({ apiKey, model, prompt, images, detail, schema }) {
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is required when provider is openai.");
    }

    const imageParts = await toDataUrlImageParts(images, detail);

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "user",
            content: [{ type: "input_text", text: prompt }, ...imageParts],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "blue_recommendation",
            strict: true,
            schema,
          },
        },
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(
        `OpenAI request failed (${response.status}): ${JSON.stringify(body, null, 2)}`,
      );
    }

    const outputText =
      body.output_text ||
      body.output
        ?.flatMap((item) => item.content || [])
        ?.find((content) => content.type === "output_text")?.text;

    if (!outputText) {
      throw new Error(`OpenAI response did not contain output text: ${JSON.stringify(body, null, 2)}`);
    }

    return {
      recommendation: JSON.parse(outputText),
      response: body,
      usage: body.usage || null,
    };
  },
};
