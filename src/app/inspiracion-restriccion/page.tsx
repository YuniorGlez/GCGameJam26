"use client";

import { useState } from "react";
import { Zap, ArrowLeft, Loader2, Sparkles, Palette, Code, Gamepad2, Quote } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Constraints {
  restriccion_arte: string;
  restriccion_tecnica: string;
  restriccion_diseno: string;
  consejo_mentor: string;
}

export default function InspiracionRestriccionPage() {
  const [baseConcept, setBaseConcept] = useState("");
  const [loading, setLoading] = useState(false);
  const [constraints, setConstraints] = useState<Constraints | null>(null);

  const generateConstraints = async () => {
    setLoading(true);
    setConstraints(null);
    
    try {
      const response = await fetch("/api/inspiracion-restriccion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseConcept }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setConstraints(data);
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
        className="inline-flex items-center text-island-cyan/70 hover:text-island-cyan transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <h1 className="text-4xl font-heading text-white">Inspiración por <span className="text-island-magenta">Restricción</span></h1>
        <p className="text-foreground/60 font-body border-l-2 border-island-magenta pl-4">
          La creatividad florece bajo presión. Genera limitaciones deliberadas para encontrar soluciones mecánicas y visuales únicas.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={baseConcept}
          onChange={(e) => setBaseConcept(e.target.value)}
          placeholder="Concepto base (opcional: ej. 'Plataformas espacial')"
          className="flex-1 bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-magenta transition-all"
        />
        <button
          onClick={generateConstraints}
          disabled={loading}
          className="bg-island-magenta hover:bg-island-magenta/80 text-white font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-magenta"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Zap className="w-5 h-5 mr-2" />
          )}
          FORZAR LÍMITES
        </button>
      </div>

      <AnimatePresence mode="wait">
        {constraints && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Arte */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-island-dark/60 border border-island-cyan/20 rounded-xl space-y-4 relative overflow-hidden group h-full"
              >
                <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Palette className="w-24 h-24 text-island-cyan" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-island-cyan/10 text-island-cyan neon-glow-cyan">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading text-white uppercase tracking-wider">Arte</h3>
                </div>
                <p className="text-sm font-body text-foreground/80 leading-relaxed min-h-[80px]">
                  {constraints.restriccion_arte}
                </p>
              </motion.div>

              {/* Técnica */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-island-dark/60 border border-island-lime/20 rounded-xl space-y-4 relative overflow-hidden group h-full"
              >
                <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Code className="w-24 h-24 text-island-lime" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-island-lime/10 text-island-lime neon-glow-lime">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading text-white uppercase tracking-wider">Código</h3>
                </div>
                <p className="text-sm font-body text-foreground/80 leading-relaxed min-h-[80px]">
                  {constraints.restriccion_tecnica}
                </p>
              </motion.div>

              {/* Diseño */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-island-dark/60 border border-island-magenta/20 rounded-xl space-y-4 relative overflow-hidden group h-full"
              >
                <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Gamepad2 className="w-24 h-24 text-island-magenta" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-island-magenta/10 text-island-magenta neon-glow-magenta">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-heading text-white uppercase tracking-wider">Diseño</h3>
                </div>
                <p className="text-sm font-body text-foreground/80 leading-relaxed min-h-[80px]">
                  {constraints.restriccion_diseno}
                </p>
              </motion.div>
            </div>

            {/* Consejo Mentor */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="p-8 bg-island-magenta/5 border border-island-magenta/30 rounded-2xl relative"
            >
              <Quote className="absolute top-4 left-4 w-8 h-8 text-island-magenta/20" />
              <div className="relative z-10 text-center space-y-4">
                <span className="text-[10px] font-heading text-island-magenta uppercase tracking-[0.2em]">Palabra del Mentor</span>
                <p className="text-xl font-heading text-white italic">
                  &quot;{constraints.consejo_mentor}&quot;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!constraints && !loading && (
        <div className="py-20 flex flex-col items-center justify-center opacity-30">
          <Sparkles className="w-16 h-16 text-island-cyan mb-4 animate-pulse" />
          <p className="font-heading text-sm">Esperando que fuerces los límites...</p>
        </div>
      )}
    </div>
  );
}
