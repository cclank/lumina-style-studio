import { GoogleGenAI, Type } from "@google/genai";
import { Theme } from "../types";

// Helper to generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateThemeFromPrompt = async (prompt: string): Promise<Theme> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    You are an expert UI/UX designer and color theorist. 
    Your task is to generate a complete web design theme based on a user's mood or description.
    Ensure high contrast between background/surface and text.
    Pick font families that exist in Google Fonts (Inter, Playfair Display, Roboto, Open Sans, Lato, Montserrat, Oswald, Source Sans Pro, Slabo 27px, Raleway, PT Sans, Merriweather, Noto Sans, Nunito, Concert One, Prompt, Space Grotesk, DM Sans, Outfit).
    Return ONLY the JSON object matching the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a UI theme for: "${prompt}".`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "A creative name for the theme" },
            description: { type: Type.STRING, description: "Short description of the vibe" },
            colors: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING, description: "Main brand color hex" },
                secondary: { type: Type.STRING, description: "Secondary brand color hex" },
                accent: { type: Type.STRING, description: "Highlight/Accent color hex" },
                background: { type: Type.STRING, description: "Page background hex" },
                surface: { type: Type.STRING, description: "Card/Container background hex" },
                text: { type: Type.STRING, description: "Main text color hex" },
                muted: { type: Type.STRING, description: "Muted/Placeholder text hex" },
              },
              required: ["primary", "secondary", "accent", "background", "surface", "text", "muted"]
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                headingFont: { type: Type.STRING, description: "Font family for headings" },
                bodyFont: { type: Type.STRING, description: "Font family for body text" },
                scale: { type: Type.STRING, enum: ["small", "medium", "large"] }
              },
              required: ["headingFont", "bodyFont", "scale"]
            },
            ui: {
              type: Type.OBJECT,
              properties: {
                borderRadius: { type: Type.STRING, description: "Border radius in px or rem" },
                borderWidth: { type: Type.STRING, description: "Border width in px" },
                shadow: { type: Type.STRING, enum: ["none", "sm", "md", "lg", "xl", "2xl"] }
              },
              required: ["borderRadius", "borderWidth", "shadow"]
            }
          },
          required: ["name", "colors", "typography", "ui"]
        }
      }
    });

    const rawText = response.text;
    if (!rawText) throw new Error("No response from AI");
    
    const data = JSON.parse(rawText);

    // Map to our Theme interface
    const newTheme: Theme = {
      id: generateId(),
      name: data.name,
      description: data.description,
      colors: data.colors,
      typography: data.typography,
      ui: data.ui
    };

    return newTheme;

  } catch (error) {
    console.error("Gemini Theme Generation Error:", error);
    throw error;
  }
};