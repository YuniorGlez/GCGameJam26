"use client";

import { useState } from "react";
import { Zap, ArrowLeft, Loader2, Sparkles, RefreshCcw, Info, Lightbulb } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Giro {
  titulo_giro: string;
  descripcion_regla: string;
  por_que_es_interesante: string;
  consejo_implementacion_rapida: string;
}

export default function GiroInesperadoPage() {
  const [concept, setConcept] = useState("");
  const [loading, setLoading] = useState(false);
  const [giro, setGiro] = useState<Giro | null>(null);

  const generateGiro = async () => {
    if (!concept) return;
    setLoading(true);
    setGiro(null);
    
    try {
      const response = await fetch("/api/giro-inesperado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setGiro(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center text-island-magenta/70 hover:text-island-magenta transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <h1 className="text-4xl font-heading text-white">El Giro <span className="text-island-magenta neon-text-magenta">Inesperado</span></h1>
        <p className="text-foreground/60 font-body max-w-2xl">
          ¿Tu juego se siente genérico? Introduce un concepto base y deja que la IA genere una regla disruptiva que lo cambie todo.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Ej: 'Un plataformas 2D', 'Tetris', 'RPG de turnos'..."
          className="flex-1 bg-island-dark/50 border border-island-magenta/20 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-magenta transition-all"
        />
        <button
          onClick={generateGiro}
          disabled={loading || !concept}
          className="bg-island-magenta hover:bg-island-magenta/80 text-white font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-magenta"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <RefreshCcw className="w-5 h-5 mr-2" />
          )}
          GENERAR GIRO
        </button>
      </div>

      <AnimatePresence mode="wait">
        {giro && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-panel p-8 rounded-2xl border-island-magenta/30 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Zap className="w-48 h-48 text-island-magenta" />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-island-magenta text-xs font-heading tracking-widest">
                  <Sparkles className="w-4 h-4" /> REGLA DISRUPTIVA GENERADA
                </div>
                <h2 className="text-3xl font-heading text-white">{giro.titulo_giro}</h2>
              </div>

              <div className="p-6 bg-island-magenta/5 border-l-4 border-island-magenta rounded-r-xl">
                <p className="text-lg font-body text-foreground/90 leading-relaxed italic">
                  &quot;{giro.descripcion_regla}&quot;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-heading text-island-cyan flex items-center gap-2">
                    <Info className="w-4 h-4" /> ¿Por qué es interesante?
                  </h3>
                  <p className="text-sm font-body text-foreground/70 leading-relaxed">
                    {giro.por_que_es_interesante}
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-heading text-island-lime flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Implementación Rápida
                  </h3>
                  <p className="text-sm font-body text-foreground/70 leading-relaxed">
                    {giro.consejo_implementacion_rapida}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
