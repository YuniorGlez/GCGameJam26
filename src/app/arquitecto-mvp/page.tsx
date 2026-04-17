"use client";

import { useState } from "react";
import { Hammer, ArrowLeft, Loader2, ShieldCheck, Box, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MVPArchitecture {
  titulo_mvp: string;
  mecanicas_sagradas: string[];
  definicion_entrega_minima: string;
}

export default function ArquitectoMVPPage() {
  const [concept, setConcept] = useState("");
  const [loading, setLoading] = useState(false);
  const [mvp, setMvp] = useState<MVPArchitecture | null>(null);

  const generateMVP = async () => {
    if (!concept) return;
    setLoading(true);
    setMvp(null);
    
    try {
      const response = await fetch("/api/arquitecto-mvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept }),
      });

      if (!response.ok) throw new Error("Error en la arquitectura");

      const data = await response.json();
      setMvp(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="island-gradient min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center text-island-cyan/70 hover:text-island-cyan transition-colors font-body text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
        </Link>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-island-magenta/20 rounded-lg text-island-magenta neon-glow-magenta">
              <Hammer className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-heading text-white">Arquitecto del <span className="text-island-magenta">MVP</span></h1>
          </div>
          <p className="text-foreground/60 font-body max-w-2xl">
            Define el núcleo innegociable de tu juego. Destila tu idea hasta quedarte con las 3 mecánicas que DEBEN funcionar para la entrega.
          </p>
        </section>

        <div className="flex flex-col md:flex-row gap-4">
          <textarea
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="Describe tu concepto de juego (ej: Un platformer donde el tiempo se detiene cuando no te mueves)..."
            className="flex-1 bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-magenta transition-all min-h-[120px] resize-none"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={generateMVP}
            disabled={loading || !concept}
            className="bg-island-magenta hover:bg-island-magenta/80 text-white font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-magenta w-full md:w-auto"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Zap className="w-5 h-5 mr-2" />
            )}
            DEFINIR MECÁNICAS SAGRADAS
          </button>
        </div>

        <AnimatePresence>
          {mvp && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 pt-8"
            >
              <div className="text-center space-y-2">
                <span className="text-xs font-heading text-island-cyan tracking-widest uppercase">Título del Proyecto MVP</span>
                <h2 className="text-3xl md:text-5xl font-heading text-white neon-text-cyan">{mvp.titulo_mvp}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mvp.mecanicas_sagradas.map((mecanica, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel p-6 rounded-xl border-l-4 border-island-lime relative overflow-hidden group"
                  >
                    <div className="absolute -top-2 -right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                      <ShieldCheck className="w-20 h-20 text-island-lime" />
                    </div>
                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center gap-2 text-island-lime">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="font-heading text-xs tracking-tighter">MECÁNICA {index + 1}</span>
                      </div>
                      <p className="font-body text-white text-sm leading-relaxed">
                        {mecanica}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-panel p-8 rounded-2xl border-t border-island-cyan/30 bg-island-cyan/5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Box className="w-6 h-6 text-island-cyan" />
                  <h3 className="text-xl font-heading text-island-cyan">Definición de Entrega Mínima</h3>
                </div>
                <p className="font-body text-foreground/80 leading-loose text-lg border-l-2 border-island-cyan/30 pl-6 italic">
                  {mvp.definicion_entrega_minima}
                </p>
              </motion.div>

              <div className="p-4 bg-island-magenta/10 border border-island-magenta/20 rounded-lg text-center">
                <p className="text-xs font-heading text-island-magenta tracking-widest">
                  ⚠️ RECUERDA: SI NO ESTÁ AQUÍ, ES DESECHABLE PARA LA ENTREGA FINAL.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
