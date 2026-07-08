# blue-border
A coastal travel journal about hidden islands, fishing spots and slow travel in Europe.

## Local AI Content Generator

Blue includes a standalone local generator for turning travel photos into one structured Blue recommendation JSON.

Setup:

```bash
cp .env.example .env.local
```

Add your real key to `.env.local`:

```bash
OPENAI_API_KEY=sk-your-real-key-here
```

Load it before running:

```bash
source .env.local
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
  --provider openai \
  --out tools/ai-content-generator/output/dahab-coffee
```

Output appears in:

```text
tools/ai-content-generator/output/dahab-coffee/
```

Do not commit `.env`, `.env.local`, API keys, raw photos, `tools/ai-content-generator/input/` or `tools/ai-content-generator/output/`.

More details: `tools/ai-content-generator/README.md`.
