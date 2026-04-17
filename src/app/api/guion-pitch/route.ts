import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { gameDetails } = await req.json();

    if (!gameDetails) {
      return NextResponse.json({ error: 'Game details are required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["hook", "problem", "solution", "usp", "team", "totalTime"],
        properties: {
          hook: { type: Type.STRING },
          problem: { type: Type.STRING },
          solution: { type: Type.STRING },
          usp: { type: Type.STRING },
          team: { type: Type.STRING },
          totalTime: { type: Type.STRING },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un experto en oratoria y marketing de videojuegos, especializado en pitches para Game Jams. 
    Basado en los siguientes detalles del juego: "${gameDetails}", estructura un guion de pitch de 2 minutos que incluya:
    1. Hook (Gancho inicial)
    2. Problema (Contexto/Necesidad)
    3. Solución (Tu juego)
    4. USP (Unique Selling Point - ¿Por qué es especial?)
    5. Equipo (Cierre con fuerza)
    
    El tono debe ser profesional pero entusiasta.`;

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
    console.error('Guion del Pitch API Error:', error);
    return NextResponse.json({ error: 'Failed to generate pitch script' }, { status: 500 });
  }
}
