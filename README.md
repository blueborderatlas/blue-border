# blue-border
A coastal travel journal about hidden islands, fishing spots and slow travel in Europe.

## Local AI Content Generator

Blue includes a standalone local generator for turning travel photos into one structured Blue recommendation JSON.

Make sure Ollama is running and `moondream` is installed:

```bash
ollama list
```

Put travel photos here:

```text
tools/ai-content-generator/input/dahab-coffee/
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
  --out tools/ai-content-generator/output/dahab-coffee
```

Output appears in:

```text
tools/ai-content-generator/output/dahab-coffee/
```

Do not commit `.env`, `.env.local`, API keys, raw photos, `tools/ai-content-generator/input/` contents or `tools/ai-content-generator/output/` contents.

More details: `tools/ai-content-generator/README.md`.
