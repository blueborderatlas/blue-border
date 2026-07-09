import { extractJson, toBase64Images } from "./image-inputs.mjs";

export const ollamaProvider = {
  name: "ollama",
  defaultModel: "moondream",

  async requestText({ model, prompt, images }) {
    const host = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
    const base64Images = await toBase64Images(images);

    const response = await fetch(`${host}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        messages: [
          {
            role: "user",
            content: prompt,
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
      text: body.message?.content || "",
      response: body,
      usage: {
        total_tokens:
          typeof body.prompt_eval_count === "number" && typeof body.eval_count === "number"
            ? body.prompt_eval_count + body.eval_count
            : null,
      },
    };
  },

  async requestJson({ model, prompt, images, schema }) {
    const host = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
    const base64Images = await toBase64Images(images);

    async function requestWithFormat(format) {
      const response = await fetch(`${host}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          stream: false,
          format,
          messages: [
            {
              role: "user",
              content: `${prompt}\n\nReturn only valid JSON. Do not wrap it in markdown.`,
              images: base64Images.map((image) => image.base64),
            },
          ],
        }),
      });

      return {
        response,
        body: await response.json(),
      };
    }

    let { response, body } = await requestWithFormat(schema || "json");

    if (!response.ok && schema) {
      ({ response, body } = await requestWithFormat("json"));
    }

    if (!response.ok) {
      throw new Error(`Ollama request failed (${response.status}): ${JSON.stringify(body, null, 2)}`);
    }

    let json;
    try {
      json = extractJson(body.message?.content);
    } catch (error) {
      error.providerResponse = body;
      error.rawText ||= body.message?.content || "";
      throw error;
    }

    return {
      json,
      response: body,
      usage: {
        total_tokens:
          typeof body.prompt_eval_count === "number" && typeof body.eval_count === "number"
            ? body.prompt_eval_count + body.eval_count
            : null,
      },
    };
  },

  async generateImageAnalysis({ model, prompt, images, schema }) {
    const result = await this.requestJson({ model, prompt, images, schema });

    return {
      analysis: result.json,
      response: result.response,
      usage: result.usage,
    };
  },

  async generateImageDescription({ model, prompt, images }) {
    const result = await this.requestText({ model, prompt, images });

    return {
      description: result.text,
      response: result.response,
      usage: result.usage,
    };
  },

  async generateRecommendation({ model, prompt, images, schema }) {
    const result = await this.requestJson({ model, prompt, images, schema });

    return {
      recommendation: result.json,
      response: result.response,
      usage: result.usage,
    };
  },
};
