"use client";

import { useState } from "react";
import { Zap, ArrowLeft, Loader2, Sparkles, AlertCircle, CheckCircle2, Scale } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface LimboResponse {
  concepto_limbo: string;
  pros_idea_a: string[];
  pros_idea_b: string[];
  veredicto_IA: string;
}

export default function GeneradorLimboPage() {
  const [ideaA, setIdeaA] = useState("");
  const [ideaB, setIdeaB] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LimboResponse | null>(null);

  const generateLimbo = async () => {
    if (!ideaA || !ideaB) return;
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch("/api/generador-limbo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea_a: ideaA, idea_b: ideaB }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-12">
      <Link
        href="/"
        className="inline-flex items-center text-island-cyan/70 hover:text-island-cyan transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4 text-center">
        <h1 className="text-4xl md:text-6xl font-heading text-white">
          Generador de <span className="text-island-magenta neon-text-magenta">Limbo</span>
        </h1>
        <p className="text-foreground/60 font-body max-w-2xl mx-auto">
          ¿No os ponéis de acuerdo? Introduce las dos ideas en conflicto y deja que la IA encuentre el punto medio perfecto o dicte sentencia para el MVP.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <div className="space-y-4">
          <label className="block text-island-cyan font-heading text-sm uppercase tracking-wider">Idea A</label>
          <textarea
            value={ideaA}
            onChange={(e) => setIdeaA(e.target.value)}
            placeholder="Ej: RPG de pesca con sistema de crafting profundo..."
            className="w-full h-32 bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-cyan transition-all resize-none"
          />
        </div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex z-10">
          <div className="bg-island-abyss border border-island-magenta/30 p-3 rounded-full shadow-[0_0_20px_rgba(229,46,138,0.3)]">
            <Scale className="w-6 h-6 text-island-magenta" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-island-lime font-heading text-sm uppercase tracking-wider">Idea B</label>
          <textarea
            value={ideaB}
            onChange={(e) => setIdeaB(e.target.value)}
            placeholder="Ej: Shooter frenético de arena con gravedad zero..."
            className="w-full h-32 bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-lime transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={generateLimbo}
          disabled={loading || !ideaA || !ideaB}
          className="bg-island-magenta hover:bg-island-magenta/80 text-white font-heading px-12 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-magenta group"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin mr-3" />
          ) : (
            <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
          )}
          RESOLVER CONFLICTO
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-8"
          >
            {/* El Limbo Section */}
            <div className="glass-panel p-8 rounded-2xl border-island-cyan/30 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-10">
                <Sparkles className="w-40 h-40 text-island-cyan" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-island-cyan/20 rounded-lg">
                    <Zap className="w-6 h-6 text-island-cyan" />
                  </div>
                  <h2 className="text-2xl font-heading text-white uppercase tracking-tighter">El Punto Medio: <span className="text-island-cyan">Limbo</span></h2>
                </div>
                <p className="text-xl font-body text-foreground leading-relaxed border-l-4 border-island-cyan pl-6">
                  {result.concepto_limbo}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros Idea A */}
              <div className="bg-island-dark/40 border border-white/5 p-6 rounded-xl space-y-4">
                <h3 className="font-heading text-island-cyan text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Fortalezas Idea A
                </h3>
                <ul className="space-y-2">
                  {result.pros_idea_a.map((pro, i) => (
                    <li key={i} className="text-sm font-body text-foreground/70 flex gap-2">
                      <span className="text-island-cyan">•</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pros Idea B */}
              <div className="bg-island-dark/40 border border-white/5 p-6 rounded-xl space-y-4">
                <h3 className="font-heading text-island-lime text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Fortalezas Idea B
                </h3>
                <ul className="space-y-2">
                  {result.pros_idea_b.map((pro, i) => (
                    <li key={i} className="text-sm font-body text-foreground/70 flex gap-2">
                      <span className="text-island-lime">•</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Veredicto Section */}
            <div className="bg-island-magenta/10 border border-island-magenta/30 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-island-magenta/20 rounded-xl shrink-0">
                  <AlertCircle className="w-8 h-8 text-island-magenta" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-heading text-island-magenta uppercase tracking-widest">Veredicto Final (48h MVP)</h3>
                  <p className="text-lg font-body text-white/90">
                    {result.veredicto_IA}
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
