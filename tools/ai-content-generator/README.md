# Blue AI Content Generator

Blue's local AI content pipeline turns travel photos into one structured recommendation draft.

It does not modify the website, recommendation data, routes or UI.

## Folder Structure

```text
tools/
  ai-content-generator/
    input/
    output/
    prompts/
    providers/
    schemas/
    logs/
    docs/
```

## Production Pipeline

```text
Travel Photos
  -> Batch Splitter (1 image by default)
  -> Vision Model (Ollama / moondream)
  -> Structured Image Analysis
  -> Blue Content Generator
  -> Quality Gate
  -> recommendation.json
```

The vision model only outputs structured facts. It does not write marketing copy.

The Blue Content Generator creates editorial content from those facts locally.

The generator never sends all images to Ollama in one request. The default is one image per request to stay safely below moondream's small context window.

## Input

Put travel photos here:

```text
tools/ai-content-generator/input/your-test-name/
```

Supported formats:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- non-animated `.gif`

Unsupported files, such as HEIC, are skipped and recorded in `image-manifest.json`.

## Run Locally With Ollama

Make sure Ollama is running and `moondream` is installed:

```bash
ollama list
```

Run:

```bash
node tools/ai-content-generator/generate-blue-recommendation.mjs \
  --photos tools/ai-content-generator/input/dahab-coffee \
  --destination Dahab \
  --country Egypt \
  --category Coffee \
  --provider ollama \
  --model moondream \
  --batchSize 1 \
  --out tools/ai-content-generator/output/dahab-coffee
```

## Run A New Destination Test

Use one folder name for each destination and category pair:

```text
tools/ai-content-generator/input/<destination-category>/
tools/ai-content-generator/output/<destination-category>/
```

Example names:

```text
dahab-diving
sardinia-stay
tokyo-coffee
crete-transport
```

Put only the photos for that test inside the input folder. Keep the folder name lowercase and use hyphens.

Run the pipeline with the same folder name for `--photos` and `--out`:

```bash
node tools/ai-content-generator/generate-blue-recommendation.mjs \
  --photos tools/ai-content-generator/input/<destination-category> \
  --destination "<Destination Name>" \
  --country "<Country Name>" \
  --category "<Category>" \
  --provider ollama \
  --model moondream \
  --batchSize 1 \
  --out tools/ai-content-generator/output/<destination-category>
```

For a second destination test, replace the placeholders:

```bash
node tools/ai-content-generator/generate-blue-recommendation.mjs \
  --photos tools/ai-content-generator/input/sardinia-stay \
  --destination "Sardinia" \
  --country "Italy" \
  --category "Stay" \
  --provider ollama \
  --model moondream \
  --batchSize 1 \
  --out tools/ai-content-generator/output/sardinia-stay
```

## Output

Every successful run generates:

```text
recommendation.json
image-analysis.json
image-analysis/
prompt.md
response.json
image-manifest.json
quality-report.json
run.log
REVIEW.md
```

## Quality Gate

The quality gate rejects output when it detects:

- factual hallucinations
- missing required fields
- empty arrays
- placeholder values
- invalid categories
- duplicated text
- confidence below threshold
- unsupported gallery filenames

If the quality gate fails, the generator saves diagnostics but does not create a production-ready `recommendation.json`.

## What Not To Commit

Do not commit:

- `.env`
- `.env.local`
- API keys
- raw travel photos
- `tools/ai-content-generator/input/` contents
- `tools/ai-content-generator/output/` contents
- raw provider response files

## Docs

Pipeline documentation:

```text
tools/ai-content-generator/docs/AI_PIPELINE.md
```
