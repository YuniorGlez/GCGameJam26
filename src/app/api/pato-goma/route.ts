import { GoogleGenAI, Type } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required and must be an array' }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const model = 'gemini-3-flash-preview';
    
    const systemPrompt = `Eres el "Pato de Goma Interactivo", un experto en debugging y diseño de videojuegos para Game Jams (específicamente para la Gran Canaria Game Island Jam). 
    Tu objetivo es ayudar a los desarrolladores a resolver problemas técnicos o de diseño mediante el método socrático.
    
    REGLAS DE COMPORTAMIENTO:
    1. NO des la solución directamente de entrada.
    2. Haz preguntas que guíen al usuario a descomponer su problema.
    3. Si el usuario explica un error de código, pídele que explique qué esperaba que pasara y qué está pasando realmente.
    4. Si el usuario está muy bloqueado después de varios intentos, puedes ofrecer pistas más directas o analizar las posibles causas, pero siempre manteniendo un tono de apoyo y mentoría.
    5. Usa un lenguaje cercano, motivador y un poco "cuac" (opcionalmente puedes usar alguna onomatopeya de pato muy de vez en cuando, pero mantente profesional).
    6. Tus respuestas deben ser en ESPAÑOL.
    7. Estás en una Game Jam de 48 horas, el tiempo es oro. Sé conciso pero profundo.
    
    Formato de salida: JSON con el campo "response".`;

    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ["response"],
        properties: {
          response: { type: Type.STRING },
        },
      },
    };

    // Convert internal messages to Gemini contents
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const chatContents = [
      {
        role: 'user',
        parts: [{ text: `INSTRUCCIÓN DE SISTEMA: ${systemPrompt}` }],
      },
      {
        role: 'model',
        parts: [{ text: '{"response": "¡Cuac! Entendido. Estoy listo para ayudarte a debugear tu juego. ¿Qué problema te está quitando tiempo de crunch?"}' }],
      },
      ...contents
    ];

    const result = await ai.models.generateContent({
      model,
      config,
      contents: chatContents,
    });

    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error('No response text from Gemini');
    }

    const data = JSON.parse(responseText);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Pato de Goma API Error:', error);
    return NextResponse.json({ error: 'Error en la comunicación con el Pato de Goma' }, { status: 500 });
  }
}
