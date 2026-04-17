import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { theme } = await req.json();

    if (!theme) {
      return NextResponse.json({ error: 'Theme is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["concepts"],
        properties: {
          concepts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["title", "genre", "hook", "mechanic"],
              properties: {
                title: { type: Type.STRING },
                genre: { type: Type.STRING },
                hook: { type: Type.STRING },
                mechanic: { type: Type.STRING },
              },
            },
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un experto diseñador de videojuegos en una Game Jam de 50 horas. 
    El tema de la jam es: "${theme}".
    Genera 3 conceptos de videojuegos innovadores, disruptivos y realizables en 50 horas por un equipo pequeño. 
    Enfócate en mecánicas core sólidas y hooks atractivos para el jurado.`;

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    // Usamos generateContent para obtener el JSON completo
    const result = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    // En el SDK de 2026, result suele ser la respuesta directa o tiene candidatos
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('No response text from Gemini');
    }

    const data = JSON.parse(responseText);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: 'Failed to generate concepts' }, { status: 500 });
  }
}
