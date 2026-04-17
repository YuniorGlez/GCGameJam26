"use client";

import { useState } from "react";
import { Palette, ArrowLeft, Loader2, Copy, Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Color {
  hex: string;
  name: string;
  description: string;
}

export default function AlquimiaColoresPage() {
  const [feeling, setFeeling] = useState("");
  const [loading, setLoading] = useState(false);
  const [palette, setPalette] = useState<Color[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generatePalette = async () => {
    if (!feeling) return;
    setLoading(true);
    setPalette([]);
    setCopiedAll(false);
    
    try {
      const response = await fetch("/api/alquimia-colores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feeling }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setPalette(data.palette);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    const allHex = palette.map(c => `${c.name}: ${c.hex}`).join("\n");
    navigator.clipboard.writeText(allHex);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
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
        <h1 className="text-4xl font-heading text-white">Alquimia de <span className="text-island-magenta">Colores</span></h1>
        <p className="text-foreground/60 font-body">
          Genera paletas cromáticas basadas en la atmósfera o sentimientos de tu juego.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          placeholder="Ej: 'Bosque misterioso', 'Cyberpunk agresivo'..."
          className="flex-1 bg-island-dark/50 border border-white/10 rounded-none px-6 py-4 font-body text-white focus:outline-none focus:border-island-magenta transition-all"
        />
        <button
          onClick={generatePalette}
          disabled={loading || !feeling}
          className="bg-island-magenta hover:bg-island-magenta/80 text-white font-heading px-8 py-4 rounded-none transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#8DC63F]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Palette className="w-5 h-5 mr-2" />
          )}
          TRANSMUTAR COLORES
        </button>
      </div>

      <AnimatePresence>
        {palette.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading text-island-lime">Paleta Generada</h2>
              <button
                onClick={copyAll}
                className="flex items-center text-sm font-body text-island-cyan hover:underline"
              >
                {copiedAll ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copiar Todo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {palette.map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col h-full bg-island-dark/40 border border-white/5 overflow-hidden"
                >
                  <div
                    className="h-32 w-full transition-transform group-hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="font-heading text-white text-sm uppercase tracking-wider">{color.name}</h3>
                      <p className="text-[10px] text-white/50 font-body leading-tight mt-1">{color.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(color.hex, index)}
                      className="flex items-center justify-between w-full mt-4 text-[12px] font-mono text-island-cyan bg-white/5 px-2 py-1 hover:bg-white/10 transition-colors"
                    >
                      {color.hex}
                      {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
