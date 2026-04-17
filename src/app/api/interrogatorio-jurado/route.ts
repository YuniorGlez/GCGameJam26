import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { pitch } = await req.json();

    if (!pitch) {
      return NextResponse.json({ error: 'Pitch content is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["questions"],
        properties: {
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["question", "context", "suggestedAnswer"],
              properties: {
                question: { type: Type.STRING },
                context: { type: Type.STRING },
                suggestedAnswer: { type: Type.STRING },
              },
            },
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un jurado veterano de una Game Jam, conocido por hacer preguntas difíciles pero constructivas. 
    Basado en el siguiente pitch o descripción del juego: "${pitch}", genera 5 preguntas desafiantes que el jurado podría hacer.
    Para cada pregunta, explica por qué se hace (contexto) y ofrece una sugerencia de cómo responderla con éxito.`;

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
    console.error('Interrogatorio Jurado API Error:', error);
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 });
  }
}
