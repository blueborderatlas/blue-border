# Sprint 23 Review: Provider-Agnostic AI Content Pipeline

Generated: 2026-07-08

## Sprint Objective

Refactor the AI content generator so model providers are abstracted behind a provider interface.

The generator should not know the request details for OpenAI, Ollama or Gemini. It should only consume a unified `generateRecommendation()` interface.

## What Changed

- Moved the Blue recommendation JSON schema into `recommendation-schema.mjs`.
- Added a provider layer under `tools/ai-content-generator/providers/`.
- Added provider adapters for:
  - OpenAI
  - Ollama
  - Gemini
- Added shared image helpers for:
  - base64 image conversion
  - data URL image parts
  - provider text-to-JSON extraction
- Refactored the main generator so it only:
  - parses CLI input
  - collects images
  - builds the prompt
  - calls `generateRecommendation()`
  - saves output files
- Added provider configuration validation before output files are written.
- Updated setup docs to explain provider selection.

No website pages, layouts, routes, homepage content, markdown posts or recommendation data files were modified.

## New Architecture

```text
generate-blue-recommendation.mjs
  -> generateRecommendation()
      -> providers/openai.mjs
      -> providers/ollama.mjs
      -> providers/gemini.mjs
```

The generator now depends on a single interface:

```js
generateRecommendation({
  providerName,
  model,
  prompt,
  images,
  detail,
  schema,
});
```

Each provider returns:

```js
{
  provider,
  model,
  recommendation,
  response,
  usage
}
```

## Supported Provider Paths

- `openai`: OpenAI Responses API with structured JSON output.
- `ollama`: local Ollama `/api/chat` with image input and JSON response mode.
- `gemini`: Gemini `generateContent` with inline image data and JSON response mode.

## User-Visible CLI Changes

The generator now accepts:

```bash
--provider openai
--provider ollama
--provider gemini
```

Provider can also be set with:

```bash
BLUE_AI_PROVIDER=openai
```

## Build And Verification

Verification performed:

- JavaScript syntax check for generator and provider files.
- Help command check.
- Provider configuration failure check without calling any AI API.
- Next.js production build.

No OpenAI API call was made during this sprint.

## Known Issues

- Real provider calls were not executed in this environment.
- Ollama output quality depends on the local model used.
- Gemini structured output is handled through provider-specific JSON response settings but still needs a real API test.
- HEIC conversion is still not implemented.
- Generated recommendation JSON is still not inserted into `lib/recommendations.ts` automatically.

## Recommended Next Sprint

Run one real provider test with a small photo set:

1. OpenAI with 3-5 images.
2. Review `recommendation.json`.
3. Compare raw `response.json`.
4. Decide whether to add a human review checklist before publishing.
