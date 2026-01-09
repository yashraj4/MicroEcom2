import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductInsights = async (product: Product): Promise<string> => {
  if (!process.env.API_KEY) {
    return "AI insights unavailable: API Key missing.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert e-commerce assistant. Analyze this product: ${product.name} - ${product.description}. 
      Price: $${product.price}.
      Provide 3 short, punchy selling points (bullet points) that explain why a developer or tech enthusiast should buy this. 
      Keep it strictly under 100 words total. Format as markdown bullet points.`,
    });
    return response.text || "No insights generated.";
  } catch (error) {
    console.error("AI Generation failed:", error);
    return "Unable to generate insights at this time.";
  }
};

export const chatWithSupport = async (message: string, context: string): Promise<string> => {
  if (!process.env.API_KEY) return "Support bot is offline (API Key missing).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `System: You are a helpful support agent for 'MicroEcom'. 
      Context: The user is currently viewing: ${context}.
      User: ${message}
      Answer politely and concisely (max 2 sentences).`,
    });
    return response.text || "I didn't catch that.";
  } catch (error) {
    return "Support system is currently experiencing high load.";
  }
};
