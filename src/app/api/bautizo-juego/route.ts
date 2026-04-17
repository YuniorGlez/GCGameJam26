import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["names"],
        properties: {
          names: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["title", "justification"],
              properties: {
                title: { type: Type.STRING },
                justification: { type: Type.STRING },
              },
            },
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un experto en marketing de videojuegos y branding creativo. 
    Basado en la siguiente descripción del juego: "${description}", genera 5 nombres creativos y atractivos.
    Para cada nombre, proporciona una breve justificación de por qué es una buena elección para una Game Jam.`;

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
    console.error('Bautizo de Juego API Error:', error);
    return NextResponse.json({ error: 'Failed to generate names' }, { status: 500 });
  }
}
