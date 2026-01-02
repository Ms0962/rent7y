
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generateListingDescription = async (itemName: string) => {
  if (!API_KEY) throw new Error("API key is missing");
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a compelling rental listing description for a ${itemName}. Include key features, ideal use cases, and a professional tone.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          features: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedPrice: { type: Type.NUMBER, description: "Daily rental price in USD" }
        },
        required: ["title", "description", "features", "suggestedPrice"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const chatWithConcierge = async (userMessage: string, history: any[]) => {
  if (!API_KEY) throw new Error("API key is missing");
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are a helpful rental marketplace concierge. You help users find items, suggest rental prices, and give advice on how to list items. Keep your tone friendly and professional. If asked about prices, give estimates based on common market values.',
      tools: [{ googleSearch: {} }]
    }
  });

  const result = await chat.sendMessage({ message: userMessage });
  return {
    text: result.text,
    sources: result.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const generateAdminInsights = async (items: any[]) => {
  if (!API_KEY) throw new Error("API key is missing");
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const itemNames = items.map(i => i.name).join(', ');
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this marketplace inventory: ${itemNames}. 
    Provide 3 high-level strategic insights for the admin. 
    Focus on: What categories are missing? What are the likely trending items this season? How can we increase revenue?`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          insights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: { type: Type.STRING },
                impact: { type: Type.STRING, description: "High, Medium, or Low" }
              },
              required: ["title", "content", "impact"]
            }
          }
        },
        required: ["insights"]
      }
    }
  });

  return JSON.parse(response.text);
};
