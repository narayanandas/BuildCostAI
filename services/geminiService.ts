import { GoogleGenAI, Type } from "@google/genai";
import { EstimateItem, QualityGrade, AIAnalysisResult } from '../types';
import { CURRENCY_SYMBOL } from '../constants';

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API Key not found in environment variables");
        throw new Error("API Key missing");
    }
    return new GoogleGenAI({ apiKey });
};

export const analyzeEstimate = async (
    area: number,
    grade: QualityGrade,
    items: EstimateItem[],
    totalCost: number
): Promise<AIAnalysisResult> => {
    const ai = getClient();
    
    // Filter only selected items for context
    const activeItems = items.filter(i => i.selected).map(i => ({
        item: i.name,
        cost: i.calculatedCost,
        quantity: `${i.calculatedQuantity.toFixed(1)} ${i.unit}`
    }));

    const prompt = `
    Act as a senior civil engineer and construction estimator.
    I have a preliminary estimate for a ${grade} quality residential construction project of ${area} sq.ft.
    
    Currency: INR (${CURRENCY_SYMBOL})
    Total Estimated Cost: ${totalCost.toLocaleString()}
    
    Breakdown of selected costs:
    ${JSON.stringify(activeItems, null, 2)}
    
    Please provide:
    1. A brief summary of whether this estimate looks realistic for a standard market (assume India/Asia context given the materials).
    2. 3 specific cost-saving tips relevant to the selected materials (e.g. Bricks vs Blocks, etc).
    3. 3 potential risks or hidden costs often overlooked in this type of estimation.
    
    Return the response in JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: { type: Type.STRING },
                        savingsTips: { 
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        risks: { 
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                    required: ['summary', 'savingsTips', 'risks']
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");
        
        return JSON.parse(text) as AIAnalysisResult;

    } catch (error) {
        console.error("Error analyzing estimate:", error);
        throw error;
    }
};