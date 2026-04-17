"use client";

import { useState } from "react";
import { Zap, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Concept {
  title: string;
  genre: string;
  hook: string;
  mechanic: string;
}

export default function BrainstormPage() {
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(false);
  const [concepts, setConcepts] = useState<Concept[]>([]);

  const generateConcepts = async () => {
    if (!theme) return;
    setLoading(true);
    setConcepts([]);
    
    try {
      const response = await fetch("/api/brainstorm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setConcepts(data.concepts);
    } catch (error) {
      console.error("Error:", error);
      // Fallback simple si la API falla
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-island-neon/70 hover:text-island-neon transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <h1 className="text-4xl font-heading text-white">Arranque <span className="text-island-neon">Explosivo</span></h1>
        <p className="text-foreground/60 font-body">
          Introduce el tema revelado a las 18:00 para generar conceptos disruptivos.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Ej: 'Bajo la superficie', 'Dualidad'..."
          className="flex-1 bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-neon transition-all"
        />
        <button
          onClick={generateConcepts}
          disabled={loading || !theme}
          className="bg-island-neon hover:bg-island-blue text-white font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Zap className="w-5 h-5 mr-2" />
          )}
          GENERAR CONCEPTOS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {concepts.map((concept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-island-dark/60 border border-island-neon/20 rounded-xl space-y-4 relative overflow-hidden group"
            >
              <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="w-24 h-24 text-island-neon" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-heading text-island-neon/70 uppercase">{concept.genre}</span>
                <h3 className="text-xl font-heading text-white">{concept.title}</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-body text-foreground/80 italic">\"{concept.hook}\"</p>
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-heading text-island-orange uppercase tracking-wider">Mecánica Core</span>
                  <p className="text-xs font-body text-foreground/60">{concept.mechanic}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
