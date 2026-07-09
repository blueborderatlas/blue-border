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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const prompt = `Describe everything you can directly observe in this image.

Do not guess.
Do not infer.
Do not assume location, business names or activities.

Only describe:
- visible objects
- people
- animals
- text
- colors
- environment

Return plain text only.`;
  const host = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
  const imageName = await selectImage(args.photos, args.image);
  const imagePath = path.join(args.photos, imageName);
  const base64 = await readFile(imagePath, "base64");

  const response = await fetch(`${host}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: args.model,
      stream: false,
      messages: [
        {
          role: "user",
          content: prompt,
          images: [base64],
        },
      ],
    }),
  });

  const responseText = await response.text();
  let body;
  try {
    body = JSON.parse(responseText);
  } catch {
    body = { raw: responseText };
  }

  if (!response.ok) {
    throw new Error(`Ollama request failed (${response.status}): ${responseText}`);
  }

  const content = body.message?.content || body.response || body.raw || "";
  const outputPath = path.join(args.output, "vision-test.txt");

  await mkdir(args.output, { recursive: true });
  await writeFile(outputPath, `${content.trim()}\n`);

  console.log(`Vision benchmark saved to ${outputPath}`);
  console.log(content.trim());
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
