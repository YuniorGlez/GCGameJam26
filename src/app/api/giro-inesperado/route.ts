import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { concept } = await req.json();

    if (!concept) {
      return NextResponse.json({ error: 'Concept is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["titulo_giro", "descripcion_regla", "por_que_es_interesante", "consejo_implementacion_rapida"],
        properties: {
          titulo_giro: { type: Type.STRING },
          descripcion_regla: { type: Type.STRING },
          por_que_es_interesante: { type: Type.STRING },
          consejo_implementacion_rapida: { type: Type.STRING },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un diseñador de juegos experto en mecánicas disruptivas.
    Toma este concepto base o juego: "${concept}".
    Genera un "Giro Inesperado" (Unexpected Twist) que sea una regla disruptiva que cambie completamente la forma de jugar, pero que sea implementable en una Game Jam.
    
    El resultado debe ser creativo, sorprendente y aportar un valor único al prototipo.`;

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
    return NextResponse.json({ error: 'Failed to generate twist' }, { status: 500 });
  }
}
