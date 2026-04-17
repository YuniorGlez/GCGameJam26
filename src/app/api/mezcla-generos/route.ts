import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { genero1, genero2 } = await req.json();

    if (!genero1 || !genero2) {
      return NextResponse.json({ error: 'Ambos géneros son obligatorios' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["titulo", "concepto", "mecanica_hibrida", "esquema_control", "estilo_camara"],
        properties: {
          titulo: { type: Type.STRING },
          concepto: { type: Type.STRING },
          mecanica_hibrida: { type: Type.STRING },
          esquema_control: { type: Type.STRING },
          estilo_camara: { type: Type.STRING },
        },
      },
    };

    const model = 'gemini-3-flash-preview';
    const prompt = `Eres un diseñador de juegos experto en Game Jams. 
    Tu tarea es mezclar dos géneros de videojuegos de forma creativa y viable para un prototipo de 48 horas.
    Géneros a mezclar: "${genero1}" y "${genero2}".
    
    Genera un concepto híbrido que incluya:
    1. Un título impactante.
    2. Un concepto general (el "elevator pitch").
    3. Una mecánica híbrida central (cómo se fusionan los dos géneros en el gameplay).
    4. Esquema de control sugerido (teclado/ratón o mando).
    5. Estilo de cámara (2D Side-scroller, Top-down, First Person, etc.).

    Reglas:
    - La idea debe ser innovadora pero ejecutable en un fin de semana.
    - El tono debe ser profesional, técnico e inspirador.
    - Responde en español.`;

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
      throw new Error('No hay respuesta de Gemini');
    }

    return NextResponse.json(JSON.parse(responseText));
  } catch (error) {
    console.error('Error en Mezcla de Géneros:', error);
    return NextResponse.json({ error: 'Fallo al mezclar géneros' }, { status: 500 });
  }
}
