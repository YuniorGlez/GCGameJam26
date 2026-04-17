import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { concepto, motor_origen, motor_destino } = await req.json();

    if (!concepto || !motor_origen || !motor_destino) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["termino_equivalente", "explicacion_diferencias", "ejemplo_uso"],
        properties: {
          termino_equivalente: { type: Type.STRING },
          explicacion_diferencias: { type: Type.STRING },
          ejemplo_uso: { type: Type.STRING },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un experto programador de videojuegos con experiencia en Unity, Godot y Unreal Engine. 
    Tu tarea es traducir un concepto técnico de un motor a otro.
    
    Concepto: "${concepto}"
    Motor de Origen: "${motor_origen}"
    Motor de Destino: "${motor_destino}"
    
    Proporciona:
    1. El término equivalente en el motor de destino.
    2. Una breve explicación de las diferencias técnicas o conceptuales si las hay.
    3. Un ejemplo de uso (fragmento de código o descripción de pasos en la UI).`;

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
    return NextResponse.json({ error: 'Failed to translate concept' }, { status: 500 });
  }
}
