# Sprint 25.1 Review: Recommendation Quality Gate

Generated: 2026-07-08

## Reviewed Output

File reviewed:

```text
tools/ai-content-generator/output/sprint-25-ollama/recommendation.json
```

## Quality Evaluation

The generated recommendation is not production quality.

### Factual Accuracy

- The output says Dubrovnik is "on the island of Dubrovnik", which is factually risky and unsupported.
- The image shows a coastal old-town view, but the model inferred a generic destination description rather than a specific recommendation.

### Writing Quality

- The summary is too short and generic.
- The title only repeats the destination name.
- The output reads like a basic caption, not a Blue editorial recommendation.

### Blue Tone

- The tone is not careful enough.
- It does not communicate uncertainty or a human review state clearly.
- It lacks practical, independent-traveler usefulness.

### Missing Fields

Missing required fields:

- `destination`
- `bestFor`
- `thingsToKnow`

### Hallucinations / Invalid Content

- `whyBlueRecommends` contains numeric values instead of text reasons.
- `suggestedGallery` contains a fake path and an empty string.
- `tags` contains a fake image path and an empty string.
- The category was changed from the requested `Local Experience` to generic `Travel`.

### Schema Completeness

The output does not satisfy the Blue recommendation schema.

## Fixes Added

- Added `quality-control.mjs`.
- Added schema and quality validation before `recommendation.json` is saved.
- Added normalization for editor-owned fields:
  - `destination`
  - `country`
  - `category`
  - `trustStatus`
  - `suggestedGallery`
  - `tags`
- Added validation for required string arrays:
  - `whyBlueRecommends`
  - `bestFor`
  - `thingsToKnow`
  - `suggestedGallery`
  - `tags`
- Added risky-claim detection for phrases such as "island of Dubrovnik".
- Updated the Ollama provider to use the JSON schema as the Ollama `format` value.
- Added a shorter Ollama-specific prompt because small local vision models follow compact JSON templates better than long editorial prompts.
- Updated the Sprint 25 runner to clear the old output folder before each local run so stale bad files do not survive a failed test.

## New Behavior

If a model returns bad JSON:

- `response.json` is saved.
- `quality-report.json` is saved.
- `recommendation.invalid.json` is saved.
- `recommendation.json` is not saved as a valid production artifact.
- The command exits with a clear failure message.

If a model passes quality checks:

- `recommendation.json` is saved.
- `quality-report.json` confirms the result passed.

## Production Quality Standard

A generated recommendation must now:

- contain every required schema field
- use text arrays, not numeric scores
- preserve editor-provided destination, country and category
- use only real source image filenames in `suggestedGallery`
- avoid unsupported factual claims
- keep `trustStatus` conservative when evidence is limited

## Next Step

Run the local Sprint 25 command again in your normal Mac terminal:

```bash
cd /Users/yuanzhang/Documents/Codex/2026-05-10/vercel-blue-border-blue-border-coastal && node tools/ai-content-generator/run-sprint-25-ollama-test.mjs
```

Then inspect:

```text
tools/ai-content-generator/output/sprint-25-ollama/quality-report.json
tools/ai-content-generator/output/sprint-25-ollama/recommendation.json
```
