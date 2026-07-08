import { extractJson, toBase64Images } from "./image-inputs.mjs";

export const ollamaProvider = {
  name: "ollama",
  defaultModel: "llava:latest",

  async generateRecommendation({ model, prompt, images }) {
    const host = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
    const base64Images = await toBase64Images(images);

    const response = await fetch(`${host}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        format: "json",
        messages: [
          {
            role: "user",
            content: `${prompt}\n\nReturn only valid JSON. Do not wrap it in markdown.`,
            images: base64Images.map((image) => image.base64),
          },
        ],
      }),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(`Ollama request failed (${response.status}): ${JSON.stringify(body, null, 2)}`);
    }

    return {
      recommendation: extractJson(body.message?.content),
      response: body,
      usage: {
        total_tokens:
          typeof body.prompt_eval_count === "number" && typeof body.eval_count === "number"
            ? body.prompt_eval_count + body.eval_count
            : null,
      },
    };
  },
};
