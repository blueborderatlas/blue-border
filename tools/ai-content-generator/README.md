# Blue AI Content Generator

This is Blue's first local AI content workflow.

It does not modify the website, recommendation data, routes or UI. It reads a local folder of travel photos, sends supported images to a configured AI vision provider and saves one complete Blue recommendation JSON.

## Input

A folder containing travel photos:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- non-animated `.gif`

Unsupported files, such as HEIC, are skipped and recorded in `image-manifest.json`.

Recommended local folder:

```text
tools/ai-content-generator/input/your-test-name/
```

Example:

```text
tools/ai-content-generator/input/dahab-coffee/
```

Put only the photos you want the model to inspect into that folder. The generator reads every supported image in the folder.

## Output

The generator writes these files to the selected output folder:

- `recommendation.json`
- `prompt.md`
- `response.json`
- `image-manifest.json`

## Run

1. Create a local environment file from the example:

```bash
cp .env.example .env.local
```

2. Add your real OpenAI API key to `.env.local`:

```bash
OPENAI_API_KEY=sk-your-real-key-here
```

Do not commit `.env.local`.

Optional provider settings:

```bash
BLUE_AI_PROVIDER=openai
BLUE_AI_MODEL=
GEMINI_API_KEY=
OLLAMA_HOST=http://127.0.0.1:11434
```

3. Load the key into your current terminal:

```bash
source .env.local
```

4. Add photos to a local input folder:

```bash
mkdir -p tools/ai-content-generator/input/dahab-coffee
```

Then copy your travel photos into:

```text
tools/ai-content-generator/input/dahab-coffee/
```

5. Run the real Vision generation:

```bash
node tools/ai-content-generator/generate-blue-recommendation.mjs \
  --photos tools/ai-content-generator/input/dahab-coffee \
  --destination Dahab \
  --country Egypt \
  --category Coffee \
  --provider openai \
  --out tools/ai-content-generator/output/dahab-coffee
```

Provider options:

- `openai`: uses the OpenAI Responses API. Requires `OPENAI_API_KEY`.
- `ollama`: uses a local Ollama server. Requires a local vision-capable model and `OLLAMA_HOST` if not using the default local host.
- `gemini`: uses the Gemini API. Requires `GEMINI_API_KEY`.

The generator only calls one shared `generateRecommendation()` interface. Provider-specific request logic lives in `tools/ai-content-generator/providers/`.

## Output Location

After a successful run, files appear here:

```text
tools/ai-content-generator/output/dahab-coffee/
```

Expected files:

```text
recommendation.json
prompt.md
response.json
image-manifest.json
```

## What Not To Commit

Do not commit:

- `.env`
- `.env.local`
- real API keys
- `tools/ai-content-generator/input/`
- `tools/ai-content-generator/output/`
- raw travel photos
- raw provider response files

The project `.gitignore` is configured to ignore the local input and output folders.

## How It Works

1. Reads image files from the selected folder.
2. Filters to browser/API-supported image formats.
3. Builds a Blue editorial prompt from `blue-recommendation-prompt.md`.
4. Converts images to base64 data URLs.
5. Sends text plus images to the selected provider.
6. Requests structured JSON using a strict schema.
7. Saves the generated recommendation, the exact prompt used and the raw provider response.
8. Prints the total token usage when the provider reports it.

## JSON Fields

The generated JSON contains:

- `title`
- `destination`
- `country`
- `category`
- `summary`
- `whyBlueRecommends`
- `bestFor`
- `thingsToKnow`
- `trustStatus`
- `suggestedGallery`
- `tags`

## Required Environment

Provider credentials must be available in the shell. The generator does not create fake output and does not have a dry-run mode.
