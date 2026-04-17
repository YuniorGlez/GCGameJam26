import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { description, hoursRemaining } = await req.json();

    if (!description || hoursRemaining === undefined) {
      return NextResponse.json({ error: 'Description and hoursRemaining are required' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["lista_sagrada", "lista_descartable", "razonamiento_economico"],
        properties: {
          lista_sagrada: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["feature", "impacto"],
              properties: {
                feature: { type: Type.STRING },
                impacto: { type: Type.STRING },
              },
            },
          },
          lista_descartable: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["feature", "riesgo_si_se_mantiene"],
              properties: {
                feature: { type: Type.STRING },
                riesgo_si_se_mantiene: { type: Type.STRING },
              },
            },
          },
          razonamiento_economico: { type: Type.STRING },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres el "Maestro del Tijeretazo", un experto en gestión de alcance (scope) para Game Jams. 
    Tu misión es salvar el proyecto eliminando lo innecesario para llegar al deadline.
    
    INFORMACIÓN DEL PROYECTO:
    - Descripción del juego: "${description}"
    - Tiempo restante: ${hoursRemaining} horas.
    
    Analiza fríamente qué características son el núcleo (MVP) y cuáles son lujos que pondrán en peligro la entrega.
    
    Genera un plan de recortes drástico pero inteligente.`;

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
    console.error('Tijeretazo Maestro API Error:', error);
    return NextResponse.json({ error: 'Failed to perform the cut' }, { status: 500 });
  }
}
