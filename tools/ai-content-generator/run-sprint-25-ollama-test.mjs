#!/usr/bin/env node

import { copyFile, mkdir, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const MODEL = "moondream";
const PROVIDER = "ollama";
const TEST_IMAGE_SOURCE = path.join(ROOT, "public", "images", "dubrovnik", "dubrovnik-cover.jpg");
const INPUT_DIR = path.join(ROOT, "tools", "ai-content-generator", "input", "sprint-25-ollama");
const OUTPUT_DIR = path.join(ROOT, "tools", "ai-content-generator", "output", "sprint-25-ollama");
const TEST_IMAGE_DESTINATION = path.join(INPUT_DIR, "test-image.jpg");
const GENERATOR = path.join(ROOT, "tools", "ai-content-generator", "generate-blue-recommendation.mjs");

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
      ...options,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      stdout += text;
      process.stdout.write(text);
    });

    child.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code}\n${stderr}`));
      }
    });
  });
}

async function main() {
  await mkdir(INPUT_DIR, { recursive: true });
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });
  await copyFile(TEST_IMAGE_SOURCE, TEST_IMAGE_DESTINATION);

  await runCommand(process.execPath, [
    GENERATOR,
    "--photos",
    INPUT_DIR,
    "--destination",
    "Dubrovnik",
    "--country",
    "Croatia",
    "--category",
    "Local Experience",
    "--provider",
    PROVIDER,
    "--model",
    MODEL,
    "--notes",
    "Sprint 25 offline Ollama test using one local project image copied into a temporary input folder.",
    "--out",
    OUTPUT_DIR,
  ]);

  console.log(`Sprint 25 output saved to ${OUTPUT_DIR}`);
  console.log(`Run review saved to ${path.join(OUTPUT_DIR, "REVIEW.md")}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
