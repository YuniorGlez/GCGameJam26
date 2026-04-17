import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { idea, motor, horas_restantes } = await req.json();

    if (!idea || !motor || horas_restantes === undefined) {
      return NextResponse.json({ error: 'idea, motor and horas_restantes are required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["nivel_marron", "puntos_criticos", "sugerencia_salud_mental"],
        properties: {
          nivel_marron: { type: Type.NUMBER, description: "Nivel de dificultad/marrón del 1 al 10" },
          puntos_criticos: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Lista de 3 a 5 puntos donde el proyecto puede fallar técnicamente" 
          },
          sugerencia_salud_mental: { 
            type: Type.STRING, 
            description: "Consejo humorístico pero útil para no volverse loco" 
          },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un veterano de Game Jams con 20 años de experiencia y un humor cínico pero paternalista.
    Evalúa la viabilidad técnica de esta idea para una Game Jam:
    - Idea: "${idea}"
    - Motor: "${motor}"
    - Horas restantes: ${horas_restantes}h
    
    Analiza si es un "marrón" (un problema técnico sobredimensionado). 
    Si las horas son pocas y la idea es compleja, el nivel_marron debe ser alto (8-10).
    Si es Godot o Web y la idea es simple, sé más benevolente.
    Si es Unreal y quedan 10 horas, el marrón es absoluto.`;

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
    return NextResponse.json({ error: 'Failed to evaluate difficulty' }, { status: 500 });
  }
}
