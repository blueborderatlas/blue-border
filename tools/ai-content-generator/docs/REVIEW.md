# Sprint 26 Review: Production Local AI Pipeline

Generated: 2026-07-08

## Objective

Turn the prototype AI generator into a production-quality local pipeline without modifying website pages, homepage, layout or recommendation data.

## What Changed

- Preserved the existing provider architecture.
- Made the production pipeline Ollama-only.
- Changed the default local model to `moondream`.
- Split generation into two stages:
  - structured image analysis
  - local Blue content generation
- Prevented the vision model from writing recommendation copy.
- Added a deterministic Blue content generator that writes from structured facts only.
- Improved the quality gate.
- Added automatic per-run files:
  - `run.log`
  - `quality-report.json`
  - `REVIEW.md`
- Reorganized generator files into:
  - `input/`
  - `output/`
  - `prompts/`
  - `providers/`
  - `schemas/`
  - `logs/`
  - `docs/`

## Pipeline

```text
Travel Photos
  -> Vision Model (Ollama / moondream)
  -> Structured Image Analysis
  -> Blue Content Generator
  -> Quality Gate
  -> recommendation.json
```

## Quality Gate Improvements

The quality gate now rejects:

- factual hallucinations
- missing required fields
- empty arrays
- placeholder values
- invalid categories
- duplicated text
- confidence below threshold
- unsupported gallery filenames

## Files Added Or Moved

- `docs/AI_PIPELINE.md`
- `prompts/vision-analysis-prompt.md`
- `prompts/blue-recommendation-prompt.md`
- `schemas/image-analysis-schema.mjs`
- `schemas/recommendation-schema.mjs`
- `blue-content-generator.mjs`
- `run-review.mjs`
- `quality-control.mjs`
- `logs/.gitkeep`
- `input/.gitkeep`
- `output/.gitkeep`

## Verification

Completed:

- JavaScript syntax checks.
- Local deterministic pipeline checks with sample image analysis.
- Next.js production build.

Not executed:

- Live Ollama model call inside Codex sandbox.

Reason:

Ollama should be run from the user's normal macOS Terminal session, not inside the Codex sandbox.

## Next Step

Run the local pipeline from macOS Terminal:

```bash
cd /Users/yuanzhang/Documents/Codex/2026-05-10/vercel-blue-border-blue-border-coastal && node tools/ai-content-generator/run-sprint-25-ollama-test.mjs
```

Then review:

```text
tools/ai-content-generator/output/sprint-25-ollama/REVIEW.md
tools/ai-content-generator/output/sprint-25-ollama/quality-report.json
tools/ai-content-generator/output/sprint-25-ollama/recommendation.json
```
