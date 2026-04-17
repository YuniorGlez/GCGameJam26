import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { feeling } = await req.json();

    if (!feeling) {
      return NextResponse.json({ error: 'Feeling is required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["palette"],
        properties: {
          palette: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["hex", "name", "description"],
              properties: {
                hex: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
              },
            },
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un experto en teoría del color y diseño visual para videojuegos. 
    Genera una paleta de 5 colores basada en el sentimiento o atmósfera: "${feeling}".
    Cada color debe incluir su código HEX, un nombre evocador y una breve descripción de por qué encaja en la paleta.`;

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
    console.error('Alquimia Colores API Error:', error);
    return NextResponse.json({ error: 'Failed to generate palette' }, { status: 500 });
  }
}
