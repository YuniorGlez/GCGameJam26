"use client";

import { useState } from "react";
import { HelpCircle, ArrowLeft, Loader2, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  question: string;
  context: string;
  suggestedAnswer: string;
}

export default function InterrogatorioJuradoPage() {
  const [pitch, setPitch] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const generateQuestions = async () => {
    if (!pitch) return;
    setLoading(true);
    setQuestions([]);
    setOpenIndex(null);
    
    try {
      const response = await fetch("/api/interrogatorio-jurado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pitch }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-island-cyan/70 hover:text-island-cyan transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <h1 className="text-4xl font-heading text-white">Interrogatorio del <span className="text-island-cyan">Jurado</span></h1>
        <p className="text-foreground/60 font-body">
          Anticipa las preguntas difíciles y prepara respuestas ganadoras.
        </p>
      </section>

      <div className="flex flex-col gap-4">
        <textarea
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          placeholder="Pega aquí tu pitch o descripción detallada del juego..."
          className="w-full bg-island-dark/50 border border-white/10 rounded-none px-6 py-4 font-body text-white focus:outline-none focus:border-island-cyan transition-all min-h-[150px]"
        />
        <button
          onClick={generateQuestions}
          disabled={loading || !pitch}
          className="bg-island-cyan hover:bg-island-cyan/80 text-island-dark font-heading px-8 py-4 rounded-none transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#8DC63F] self-end"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <HelpCircle className="w-5 h-5 mr-2" />
          )}
          SIMULAR INTERROGATORIO
        </button>
      </div>

      <AnimatePresence>
        {questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-heading text-island-lime">Preguntas Probables</h2>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={index} className="bg-island-dark/40 border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-island-magenta font-heading text-lg">0{index + 1}</span>
                      <h3 className="text-white font-heading text-lg leading-tight">{q.question}</h3>
                    </div>
                    {openIndex === index ? <ChevronUp className="text-island-cyan" /> : <ChevronDown className="text-island-cyan" />}
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 space-y-4 border-t border-white/5 mt-4">
                          <div className="space-y-1">
                            <h4 className="text-[10px] uppercase tracking-widest text-island-lime font-heading">Por qué preguntan esto:</h4>
                            <p className="text-white/60 font-body text-sm italic">{q.context}</p>
                          </div>
                          <div className="bg-island-cyan/5 p-4 border-l-2 border-island-cyan space-y-2">
                            <h4 className="text-xs uppercase tracking-widest text-island-cyan font-heading flex items-center gap-2">
                              <MessageSquare className="w-3 h-3" /> Estrategia de Respuesta:
                            </h4>
                            <p className="text-white font-body text-sm leading-relaxed">{q.suggestedAnswer}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
