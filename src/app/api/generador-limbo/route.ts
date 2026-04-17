import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { idea_a, idea_b } = await req.json();

    if (!idea_a || !idea_b) {
      return NextResponse.json({ error: 'Both ideas are required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["concepto_limbo", "pros_idea_a", "pros_idea_b", "veredicto_IA"],
        properties: {
          concepto_limbo: {
            type: Type.STRING,
            description: "Un concepto que fusiona lo mejor de ambas ideas o una tercera vía innovadora."
          },
          pros_idea_a: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Puntos fuertes de la Idea A."
          },
          pros_idea_b: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Puntos fuertes de la Idea B."
          },
          veredicto_IA: {
            type: Type.STRING,
            description: "Recomendación final basada en la factibilidad técnica y creativa para una jam de 48h."
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un consultor de diseño de videojuegos experto en Game Jams de 48 horas. 
    Tu equipo está dudando entre dos ideas:
    Idea A: "${idea_a}"
    Idea B: "${idea_b}"
    
    Tu misión es:
    1. Analizar objetivamente los pros de cada una.
    2. Encontrar el "Limbo": un punto medio brillante que combine elementos de ambas o una resolución creativa al conflicto.
    3. Dar un veredicto honesto sobre cuál es más realista terminar con alta calidad en 48 horas (MVP).
    
    Responde estrictamente en JSON.`;

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    const result = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('No response text from Gemini');
    }

    const data = JSON.parse(responseText);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Limbo Generator Error:', error);
    return NextResponse.json({ error: 'Failed to find the Limbo' }, { status: 500 });
  }
}
