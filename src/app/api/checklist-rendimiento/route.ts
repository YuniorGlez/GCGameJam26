import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { engine, issues } = await req.json();

    if (!engine) {
      return NextResponse.json({ error: 'El motor de juego es obligatorio' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const model = 'gemini-3-flash-preview';
    
    const systemPrompt = `Eres un experto técnico en optimización de videojuegos para Game Jams, especializado en entregas rápidas y builds Web/HTML5.
    Tu objetivo es generar una lista de tareas (checklist) priorizada para optimizar el rendimiento de un juego basado en el motor seleccionado y los problemas reportados.
    
    REGLAS:
    1. Genera una lista de tareas técnica pero fácil de seguir.
    2. Prioriza tareas que den el mayor impacto con el menor esfuerzo (ideal para el crunch final).
    3. Enfócate especialmente en optimización para Web (tamaño de build, draw calls, uso de memoria, compresión de assets).
    4. Las respuestas deben ser en ESPAÑOL.
    5. Cada tarea debe tener un título conciso, una descripción clara y una prioridad (Alta, Media, Baja).
    
    Formato de salida: JSON con un array de "items", cada uno con "title", "description" y "priority".`;

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["items"],
        properties: {
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["title", "description", "priority"],
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                priority: { type: Type.STRING, enum: ["Alta", "Media", "Baja"] },
              },
            },
          },
        },
      },
    };

    const userPrompt = `Motor: ${engine}. 
    Problemas específicos: ${issues || 'Optimización general de rendimiento y tamaño de build.'}`;

    const result = await ai.models.generateContent({
      model,
      config,
      contents: [
        {
          role: 'user',
          parts: [{ text: `INSTRUCCIÓN DE SISTEMA: ${systemPrompt}` }],
        },
        {
          role: 'user',
          parts: [{ text: userPrompt }],
        },
      ],
    });

    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('No response text from Gemini');
    }

    const data = JSON.parse(responseText);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Checklist Rendimiento API Error:', error);
    return NextResponse.json({ error: 'Error al generar el checklist de rendimiento' }, { status: 500 });
  }
}
