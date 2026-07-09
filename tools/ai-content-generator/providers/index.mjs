import { geminiProvider } from "./gemini.mjs";
import { ollamaProvider } from "./ollama.mjs";
import { openaiProvider } from "./openai.mjs";

const providers = {
  [openaiProvider.name]: openaiProvider,
  [ollamaProvider.name]: ollamaProvider,
  [geminiProvider.name]: geminiProvider,
};

export function getProvider(providerName) {
  const provider = providers[providerName?.toLowerCase()];

  if (!provider) {
    throw new Error(
      `Unsupported provider "${providerName}". Supported providers: ${Object.keys(providers).join(
        ", ",
      )}`,
    );
  }

  return provider;
}

export function getProviderApiKey(providerName) {
  const normalizedProvider = providerName?.toLowerCase();
  if (normalizedProvider === "openai") return process.env.OPENAI_API_KEY;
  if (normalizedProvider === "gemini") return process.env.GEMINI_API_KEY;
  return null;
}

export function validateProviderConfiguration(providerName) {
  const provider = getProvider(providerName);
  const apiKey = getProviderApiKey(provider.name);

  if (provider.name === "openai" && !apiKey) {
    throw new Error("OPENAI_API_KEY is required when provider is openai.");
  }

  if (provider.name === "gemini" && !apiKey) {
    throw new Error("GEMINI_API_KEY is required when provider is gemini.");
  }

  return provider;
}

export async function generateRecommendation({
  providerName,
  model,
  prompt,
  images,
  detail,
  schema,
}) {
  const provider = validateProviderConfiguration(providerName);
  const resolvedModel = model || process.env.BLUE_AI_MODEL || provider.defaultModel;

  const result = await provider.generateRecommendation({
    apiKey: getProviderApiKey(providerName),
    model: resolvedModel,
    prompt,
    images,
    detail,
    schema,
  });

  return {
    provider: provider.name,
    model: resolvedModel,
    recommendation: result.recommendation,
    response: result.response,
    usage: result.usage,
  };
}

export async function generateImageAnalysis({
  providerName,
  model,
  prompt,
  images,
  detail,
  schema,
}) {
  const provider = validateProviderConfiguration(providerName);
  const resolvedModel = model || process.env.BLUE_AI_MODEL || provider.defaultModel;

  if (!provider.generateImageAnalysis) {
    throw new Error(`Provider "${provider.name}" does not support structured image analysis.`);
  }

  const result = await provider.generateImageAnalysis({
    apiKey: getProviderApiKey(providerName),
    model: resolvedModel,
    prompt,
    images,
    detail,
    schema,
  });

  return {
    provider: provider.name,
    model: resolvedModel,
    analysis: result.analysis,
    response: result.response,
    usage: result.usage,
  };
}

export async function generateImageDescription({
  providerName,
  model,
  prompt,
  images,
  detail,
}) {
  const provider = validateProviderConfiguration(providerName);
  const resolvedModel = model || process.env.BLUE_AI_MODEL || provider.defaultModel;

  if (!provider.generateImageDescription) {
    throw new Error(`Provider "${provider.name}" does not support plain-text image descriptions.`);
  }

  const result = await provider.generateImageDescription({
    apiKey: getProviderApiKey(providerName),
    model: resolvedModel,
    prompt,
    images,
    detail,
  });

  return {
    provider: provider.name,
    model: resolvedModel,
    description: result.description,
    response: result.response,
    usage: result.usage,
  };
}
