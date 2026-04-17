import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { logicDescription } = await req.json();

    if (!logicDescription) {
      return NextResponse.json({ error: 'Logic description is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["pseudocodigo", "explicacion_pasos", "variables_necesarias"],
        properties: {
          pseudocodigo: { type: Type.STRING },
          explicacion_pasos: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          variables_necesarias: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un Ingeniero de Software experto en Game Jams.
    El usuario tiene una idea de lógica "sucia" o informal para su juego:
    "${logicDescription}"

    Tu tarea es traducir esto a un pseudocódigo limpio, estructurado y fácil de implementar en cualquier motor (Unity, Godot, Unreal).
    
    Proporciona:
    1. El pseudocódigo formateado (usa bloques de código si es necesario, pero devuélvelo como string).
    2. Una lista de pasos lógicos explicados.
    3. Una lista de variables necesarias para implementar esta lógica.`;

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
    console.error('Traductor Logica API Error:', error);
    return NextResponse.json({ error: 'Error al traducir la lógica' }, { status: 500 });
  }
}
