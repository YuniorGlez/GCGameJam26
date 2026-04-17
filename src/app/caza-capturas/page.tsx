"use client";

import { useState } from "react";
import { Camera, ArrowLeft, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Suggestion {
  title: string;
  description: string;
  angle: string;
  content: string;
}

export default function CazaCapturasPage() {
  const [genre, setGenre] = useState("");
  const [style, setStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const generateSuggestions = async () => {
    if (!genre || !style) return;
    setLoading(true);
    setSuggestions([]);
    
    try {
      const response = await fetch("/api/caza-capturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre, style }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-4xl font-heading text-white">Caza <span className="text-island-cyan">Capturas</span></h1>
        <p className="text-foreground/60 font-body">
          Identifica los momentos más épicos de tu juego para lucirte en Itch.io.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-heading text-island-cyan/70 uppercase">Género del Juego</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Ej: Platformer, Terror, Puzzle..."
            className="w-full bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-cyan transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-heading text-island-cyan/70 uppercase">Estilo Visual</label>
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder="Ej: Pixel Art, Low Poly, Cyberpunk..."
            className="w-full bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-cyan transition-all"
          />
        </div>
      </div>

      <button
        onClick={generateSuggestions}
        disabled={loading || !genre || !style}
        className="w-full bg-island-cyan hover:bg-island-cyan/80 text-white font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-cyan"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <Camera className="w-5 h-5 mr-2" />
        )}
        PLANIFICAR CAPTURAS
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-island-dark/60 border border-island-cyan/20 rounded-xl space-y-4 relative overflow-hidden group glass-panel"
            >
              <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <ImageIcon className="w-24 h-24 text-island-cyan" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-heading text-white">{suggestion.title}</h3>
                <span className="text-[10px] font-heading text-island-cyan/70 uppercase">{suggestion.angle}</span>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-body text-foreground/80">{suggestion.description}</p>
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-heading text-island-lime uppercase tracking-wider">Contenido de la Toma</span>
                  <p className="text-xs font-body text-foreground/60 mt-1">{suggestion.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
