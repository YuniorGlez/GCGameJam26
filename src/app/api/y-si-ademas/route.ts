import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'La idea base es obligatoria' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["expansiones"],
        properties: {
          expansiones: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["titulo", "descripcion", "porque_funciona"],
              properties: {
                titulo: { type: Type.STRING },
                descripcion: { type: Type.STRING },
                porque_funciona: { type: Type.STRING },
              },
            },
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un mentor experto en Game Jams de 48 horas. 
    Un equipo tiene esta idea base: "${idea}".
    Tu objetivo es aplicar la técnica de improvisación "¿Y si además...?" para expandir la idea.
    Reglas estrictas:
    1. Genera 3 sugerencias que aporten profundidad o un giro interesante.
    2. NO debes cambiar el núcleo de la idea original.
    3. Las sugerencias DEBEN ser realizables en menos de 24 horas de trabajo.
    4. Explica brevemente por qué esa expansión ayuda a que el juego sea más divertido o memorable.
    Responde en español con un tono motivador y técnico.`;

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
      throw new Error('No hay respuesta de Gemini');
    }

    return NextResponse.json(JSON.parse(responseText));
  } catch (error) {
    console.error('Error en ¿Y si además...?:', error);
    return NextResponse.json({ error: 'Fallo al expandir la idea' }, { status: 500 });
  }
}
