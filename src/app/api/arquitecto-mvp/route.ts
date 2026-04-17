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
        required: ["titulo_mvp", "mecanicas_sagradas", "definicion_entrega_minima"],
        properties: {
          titulo_mvp: { type: Type.STRING },
          mecanicas_sagradas: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 3,
            maxItems: 3,
          },
          definicion_entrega_minima: { type: Type.STRING },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un Arquitecto de MVPs experto en Game Jams de 48 horas.
    Has recibido el siguiente concepto de juego: "${concept}".
    Tu misión es destilar este concepto a su esencia más pura y realizable.
    
    1. Define un título sólido para el MVP.
    2. Identifica las 3 "Mecánicas Sagradas": aquellas que si se eliminan, el juego deja de tener sentido. Deben ser realizables en menos de 20 horas.
    3. Define la "Entrega Mínima": un párrafo corto que describa qué es lo mínimo que debe estar funcionando para que el juego sea jugable y divertido (el "Vertical Slice" del crunch).
    
    Sé brutalmente honesto con el alcance. Menos es más en una jam.`;

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
    console.error('Arquitecto MVP API Error:', error);
    return NextResponse.json({ error: 'Failed to build MVP architecture' }, { status: 500 });
  }
}
