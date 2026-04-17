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
        required: ["lista_arte", "lista_sonido", "consejo_estilo"],
        properties: {
          lista_arte: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          lista_sonido: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          consejo_estilo: { type: Type.STRING },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un productor de videojuegos experto en Game Jams. 
    Tu objetivo es ayudar a un equipo a priorizar los assets necesarios para su prototipo en 48 horas.
    
    Concepto del juego: "${concept}"
    
    Genera:
    1. "lista_arte": Una lista minimalista de assets de arte (sprites, modelos, UI) esenciales para el MVP.
    2. "lista_sonido": Una lista minimalista de efectos de sonido y música ambiente necesarios.
    3. "consejo_estilo": Un consejo breve y accionable sobre cómo ahorrar tiempo en el arte (ej. paletas limitadas, kits bash, estilo low-poly, etc.).
    
    Sé realista: el equipo solo tiene 48 horas. Prioriza lo que da más impacto visual y feedback al jugador.`;

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
    return NextResponse.json({ error: 'Failed to generate asset list' }, { status: 500 });
  }
}
