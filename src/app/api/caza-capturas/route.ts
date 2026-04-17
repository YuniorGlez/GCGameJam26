import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { genre, style } = await req.json();

    if (!genre || !style) {
      return NextResponse.json({ error: 'Genre and style are required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["suggestions"],
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["title", "description", "angle", "content"],
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                angle: { type: Type.STRING },
                content: { type: Type.STRING },
              },
            },
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un experto en marketing de videojuegos indie para Itch.io. 
    Género del juego: "${genre}".
    Estilo visual: "${style}".
    
    Sugiere 4 capturas de pantalla impactantes que destaquen el juego. 
    Para cada una, proporciona:
    1. Un título descriptivo.
    2. Una descripción de por qué esta captura es importante.
    3. El ángulo de cámara o composición sugerida.
    4. El contenido exacto que debe aparecer (personajes, enemigos, UI, efectos).`;

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
    return NextResponse.json({ error: 'Failed to generate screenshot suggestions' }, { status: 500 });
  }
}
