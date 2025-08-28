import { GoogleGenAI, Type } from "@google/genai";
import { ASSET_PROMPTS, QUESTIONS_COUNT } from '../constants';
import { GameAssets, Question } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateImage = async (prompt: string, negativePrompt?: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1', // Most assets are squarish, background can be stretched
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    }
    throw new Error('No image was generated.');
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

export const generateGameAssets = async (onProgress: (message: string, isDone: boolean) => void): Promise<GameAssets> => {
    const assets: Partial<GameAssets> = {};
    for (const assetPrompt of ASSET_PROMPTS) {
        onProgress(`Generating ${assetPrompt.name}...`, false);
        try {
            const imageUrl = await generateImage(assetPrompt.prompt, assetPrompt.negativePrompt);
            assets[assetPrompt.key] = imageUrl;
            onProgress(`${assetPrompt.name} generated!`, false);
        } catch (error) {
            onProgress(`Failed to generate ${assetPrompt.name}. Please check your API key and network.`, true);
            throw new Error(`Failed on asset: ${assetPrompt.name}`);
        }
    }
    return assets as GameAssets;
};

export const generateQuestions = async (onProgress: (message: string, isDone: boolean) => void): Promise<Question[]> => {
    onProgress('Generating true/false questions...', false);
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate ${QUESTIONS_COUNT} interesting and varied true or false questions suitable for a general audience game. Ensure a mix of topics like science, history, pop culture, and nature.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    statement: {
                                        type: Type.STRING,
                                        description: 'The true or false statement.',
                                    },
                                    isTrue: {
                                        type: Type.BOOLEAN,
                                        description: 'Whether the statement is true or false.',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        const jsonStr = response.text.trim();
        const parsed = JSON.parse(jsonStr);
        onProgress('Questions generated!', false);
        return parsed.questions;
    } catch (error) {
        onProgress(`Failed to generate questions. Please check your API key and network.`, true);
        console.error('Error generating questions:', error);
        throw error;
    }
};
