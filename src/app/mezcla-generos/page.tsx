"use client";

import { useState } from "react";
import { Zap, ArrowLeft, Loader2, Sparkles, Gamepad2, Camera, MousePointer2, Shuffle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface HybridConcept {
  titulo: string;
  concepto: string;
  mecanica_hibrida: string;
  esquema_control: string;
  estilo_camara: string;
}

const COMMON_GENRES = [
  "Carreras", "RPG", "FPS", "Plataformas", "Estrategia", 
  "Terror", "Puzzle", "Roguelike", "Metroidvania", "Survival",
  "Musical", "Simulación", "Bullet Hell", "Tower Defense", "Stealth"
];

export default function MezclaGenerosPage() {
  const [genero1, setGenero1] = useState("");
  const [genero2, setGenero2] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<HybridConcept | null>(null);

  const mezclarGeneros = async () => {
    if (!genero1 || !genero2) return;
    setLoading(true);
    setResultado(null);
    
    try {
      const response = await fetch("/api/mezcla-generos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genero1, genero2 }),
      });

      if (!response.ok) throw new Error("Error en la mezcla");

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const randomize = () => {
    const g1 = COMMON_GENRES[Math.floor(Math.random() * COMMON_GENRES.length)];
    let g2 = COMMON_GENRES[Math.floor(Math.random() * COMMON_GENRES.length)];
    while (g1 === g2) {
      g2 = COMMON_GENRES[Math.floor(Math.random() * COMMON_GENRES.length)];
    }
    setGenero1(g1);
    setGenero2(g2);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-island-cyan/70 hover:text-island-cyan transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-island-lime/20 rounded-xl text-island-lime neon-glow-lime">
            <Zap className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-heading text-white">
            Mezcla de <span className="text-island-lime">Géneros</span>
          </h1>
        </div>
        <p className="text-foreground/60 font-body border-l-2 border-island-lime pl-4">
          Fusiona dos géneros improbables para crear una experiencia única. 
          La innovación suele nacer de la colisión de mundos diferentes.
        </p>
      </section>

      <div className="glass-panel p-8 rounded-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Shuffle className="w-32 h-32 text-island-lime" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-heading text-island-cyan uppercase tracking-wider">Género A</label>
            <input
              type="text"
              value={genero1}
              onChange={(e) => setGenero1(e.target.value)}
              placeholder="Ej: Carreras"
              className="w-full bg-island-dark/50 border border-white/10 rounded-xl px-4 py-3 font-body text-white focus:outline-none focus:border-island-lime transition-all"
              list="genres-list"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-heading text-island-magenta uppercase tracking-wider">Género B</label>
            <input
              type="text"
              value={genero2}
              onChange={(e) => setGenero2(e.target.value)}
              placeholder="Ej: RPG"
              className="w-full bg-island-dark/50 border border-white/10 rounded-xl px-4 py-3 font-body text-white focus:outline-none focus:border-island-magenta transition-all"
              list="genres-list"
            />
          </div>
        </div>

        <datalist id="genres-list">
          {COMMON_GENRES.map(g => <option key={g} value={g} />)}
        </datalist>

        <div className="flex gap-4 relative z-10">
          <button
            onClick={mezclarGeneros}
            disabled={loading || !genero1 || !genero2}
            className="flex-1 bg-island-lime hover:bg-lime-600 text-island-dark font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-lime"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-5 h-5 mr-2" />
            )}
            ¡GENERAR HÍBRIDO!
          </button>
          <button
            onClick={randomize}
            disabled={loading}
            className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
            title="Aleatorio"
          >
            <Shuffle className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {resultado && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8 rounded-2xl border-t-4 border-island-lime relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-5">
                <Gamepad2 className="w-48 h-48 text-island-lime" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-heading text-island-lime uppercase tracking-[0.3em] block">
                    Concepto Generado
                  </span>
                  <h2 className="text-4xl font-heading text-white">{resultado.titulo}</h2>
                </div>

                <div className="p-6 bg-island-lime/5 rounded-xl border border-island-lime/20 leading-relaxed text-foreground/90 font-body">
                  {resultado.concepto}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-island-cyan">
                      <Zap className="w-4 h-4" />
                      <span className="text-[10px] font-heading uppercase tracking-wider">Mecánica Core</span>
                    </div>
                    <p className="text-sm font-body text-foreground/80">{resultado.mecanica_hibrida}</p>
                  </div>

                  <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-island-magenta">
                      <MousePointer2 className="w-4 h-4" />
                      <span className="text-[10px] font-heading uppercase tracking-wider">Controles</span>
                    </div>
                    <p className="text-sm font-body text-foreground/80">{resultado.esquema_control}</p>
                  </div>

                  <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-island-lime">
                      <Camera className="w-4 h-4" />
                      <span className="text-[10px] font-heading uppercase tracking-wider">Cámara</span>
                    </div>
                    <p className="text-sm font-body text-foreground/80">{resultado.estilo_camara}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
