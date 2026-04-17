import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { logs } = await req.json();

    if (!logs) {
      return NextResponse.json({ error: 'Logs/Notes are required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["summary"],
        properties: {
          summary: {
            type: Type.OBJECT,
            required: ["story", "features", "controls", "credits"],
            properties: {
              story: { type: Type.STRING },
              features: { type: Type.ARRAY, items: { type: Type.STRING } },
              controls: { type: Type.ARRAY, items: { type: Type.STRING } },
              credits: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un redactor experto para Itch.io. 
    Transforma estas notas sucias y logs de desarrollo de una Game Jam en una descripción profesional y atractiva.
    
    Notas/Logs:
    "${logs}"
    
    Genera un JSON con:
    1. "story": Un párrafo corto y ganchero que resuma la premisa del juego.
    2. "features": Una lista de 3-5 características principales (bullet points).
    3. "controls": Una lista clara de los controles.
    4. "credits": Una lista de los roles y atribuciones (si se mencionan, si no, genera genéricos basados en las notas).`;

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
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to generate submission summary' }, { status: 500 });
  }
}
