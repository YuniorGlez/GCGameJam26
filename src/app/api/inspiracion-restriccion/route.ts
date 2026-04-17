import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { baseConcept } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["restriccion_arte", "restriccion_tecnica", "restriccion_diseno", "consejo_mentor"],
        properties: {
          restriccion_arte: { type: Type.STRING },
          restriccion_tecnica: { type: Type.STRING },
          restriccion_diseno: { type: Type.STRING },
          consejo_mentor: { type: Type.STRING },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un mentor experto en Game Jams de alto rendimiento (tipo Island Jam). 
    Tu objetivo es ayudar a un equipo a desbloquear su creatividad mediante el uso de restricciones deliberadas.
    
    Concepto base (opcional): "${baseConcept || 'Sin concepto previo - Genera restricciones generales e impactantes'}"
    
    Genera 3 restricciones creativas específicas y desafiantes:
    1. Una para el ARTE (ej: paleta de 3 colores, estilo 1-bit, solo formas geométricas, etc.)
    2. Una para el CÓDIGO/TÉCNICA (ej: sin motores de físicas, entrada de solo un botón, sin condicionales 'if', etc.)
    3. Una para el DISEÑO/GAMEPLAY (ej: el jugador no puede saltar, tiempo limitado a 10 segundos, sin enemigos, etc.)
    
    Además, proporciona un "consejo_mentor" breve y motivador sobre cómo abrazar estas limitaciones para potenciar la innovación.`;

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
    return NextResponse.json({ error: 'Failed to generate constraints' }, { status: 500 });
  }
}
