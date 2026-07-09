import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_INPUT_DIR = "tools/ai-content-generator/input/dahab-diving";
const DEFAULT_OUTPUT_DIR = "tools/ai-content-generator/output/dahab-diving";
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function parseArgs(argv) {
  const args = {
    photos: DEFAULT_INPUT_DIR,
    output: DEFAULT_OUTPUT_DIR,
    model: "moondream",
    image: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) continue;

    const key = value.slice(2);
    args[key] = argv[index + 1];
    index += 1;
  }

  return args;
}

async function selectImage(photosDir, requestedImage) {
  const entries = await readdir(photosDir, { withFileTypes: true });
  const images = entries
    .filter((entry) => entry.isFile() && SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  if (images.length === 0) {
    throw new Error(`No supported images found in ${photosDir}.`);
  }

  if (requestedImage) {
    if (!images.includes(requestedImage)) {
      throw new Error(`Requested image "${requestedImage}" was not found in ${photosDir}.`);
    }
    return requestedImage;
  }

  return images[0];
}

function createRequestBody({ model, prompt, base64 }) {
  return {
    model,
    stream: false,
    messages: [
      {
        role: "user",
        content: prompt,
        images: [base64],
      },
    ],
  };
}

function omitBase64(requestBody) {
  return {
    ...requestBody,
    messages: requestBody.messages.map((message) => ({
      ...message,
      images: message.images.map((image) => `<base64 omitted: ${image.length} chars>`),
    })),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const host = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
  const prompt = `Describe exactly what you can see in this image.

Mention:
- people
- animals
- vehicles
- buildings
- water
- sky
- objects
- activities
- visible text

If you cannot identify something, say so.

Return plain English only.`;

  const imageName = await selectImage(args.photos, args.image);
  const imagePath = path.join(args.photos, imageName);
  const base64 = await readFile(imagePath, "base64");
  const requestBody = createRequestBody({ model: args.model, prompt, base64 });
  const safeRequestBody = omitBase64(requestBody);

  console.log("HTTP request body without image base64:");
  console.log(JSON.stringify(safeRequestBody, null, 2));

  const response = await fetch(`${host}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  const responseText = await response.text();

  console.log("HTTP response:");
  console.log(responseText);

  let responseBody;
  try {
    responseBody = JSON.parse(responseText);
  } catch {
    responseBody = null;
  }

  const modelText = responseBody?.message?.content || responseBody?.response || responseText;

  await mkdir(args.output, { recursive: true });
  await writeFile(path.join(args.output, "vision-test.txt"), `${modelText.trim()}\n`);
  await writeFile(
    path.join(args.output, "vision-response.json"),
    `${JSON.stringify(
      {
        image: imageName,
        endpoint: `${host}/api/chat`,
        requestBodyWithoutBase64: safeRequestBody,
        httpStatus: response.status,
        httpOk: response.ok,
        rawResponseText: responseText,
        responseBody,
      },
      null,
      2,
    )}\n`,
  );

  if (!response.ok) {
    throw new Error(`Ollama request failed (${response.status}).`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
