# Sprint 31 Review: Tolerant Ollama JSON Parsing

Generated: 2026-07-08

## Objective

Make the Ollama provider tolerant of imperfect JSON returned by `moondream` without modifying website pages, homepage, layout, UI or recommendation data.

## Problem

`moondream` can respond successfully but return text that is not immediately parseable JSON.

Observed failure:

```text
Expected ',' or '}' after property value
```

## What Changed

- Added tolerant JSON extraction before `JSON.parse()`.
- Removed markdown fences:
  - ```json
  - ```
- Trimmed whitespace before parsing.
- Extracted the first complete JSON object from mixed text.
- Added simple safe repairs:
  - trailing commas
  - smart double quotes
  - smart single quotes
  - missing final newline
- Added `JsonExtractionError` with raw/cleaned/extracted/repaired text details.
- Added generator-level parsing failure handling.

## Failure Outputs

If repair fails, the pipeline now saves:

```text
response.raw.txt
response.invalid.json
quality-report.json
run.log
REVIEW.md
```

If Ollama also returned a normal API response body, it is saved as:

```text
response.json
```

## Behavior

If repair succeeds:

- the pipeline continues normally
- batch image analysis is saved
- final merged recommendation can proceed

If repair fails:

- raw model text is preserved
- invalid extracted/repaired JSON text is preserved
- quality gate reports a parsing failure
- the run stops clearly instead of failing silently

## Token Statistics In REVIEW.md

Generated run reviews now retain token estimates even when JSON parsing fails:

- prompt tokens
- response tokens
- estimated total tokens
- images processed
- average tokens per image

## Verification

Completed:

- JavaScript syntax checks.
- Parser tests for:
  - markdown-fenced JSON
  - extra text before/after JSON
  - trailing commas
  - smart quotes
  - invalid JSON failure path

Not executed:

- Ollama model run.
- Paid API call.

## Next Step

Run the Dahab diving command again from normal macOS Terminal. If `moondream` returns imperfect JSON, the pipeline should now either repair it safely or preserve the raw response for review.
