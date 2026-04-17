import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { action } = await req.json();

    if (!action) {
      return NextResponse.json({ error: 'Action or object is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["keywords"],
        properties: {
          keywords: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["en", "es"],
              properties: {
                en: { type: Type.STRING },
                es: { type: Type.STRING },
              },
            },
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un experto diseñador de sonido para videojuegos. 
    Genera una lista de 10 palabras clave descriptivas para buscar efectos de sonido (SFX) en bancos externos (como Freesound o Sonniss) basados en la acción u objeto: "${action}".
    Proporciona cada palabra clave en inglés (para buscadores internacionales) y su equivalente en español.`;

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
    console.error('Diccionario Sonidos API Error:', error);
    return NextResponse.json({ error: 'Failed to generate keywords' }, { status: 500 });
  }
}
