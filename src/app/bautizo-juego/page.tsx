"use client";

import { useState } from "react";
import { Type as TypeIcon, ArrowLeft, Loader2, Copy, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface GameName {
  title: string;
  justification: string;
}

export default function BautizoJuegoPage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState<GameName[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateNames = async () => {
    if (!description) return;
    setLoading(true);
    setNames([]);
    
    try {
      const response = await fetch("/api/bautizo-juego", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setNames(data.names);
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-island-cyan/70 hover:text-island-cyan transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <h1 className="text-4xl font-heading text-white">Bautizo de <span className="text-island-magenta">Juego</span></h1>
        <p className="text-foreground/60 font-body">
          Generador de nombres creativos basados en la descripción del juego.
        </p>
      </section>

      <div className="flex flex-col gap-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe tu juego (mecánicas, atmósfera, tema)..."
          className="w-full bg-island-dark/50 border border-white/10 rounded-none px-6 py-4 font-body text-white focus:outline-none focus:border-island-magenta transition-all min-h-[150px]"
        />
        <button
          onClick={generateNames}
          disabled={loading || !description}
          className="bg-island-magenta hover:bg-island-magenta/80 text-white font-heading px-8 py-4 rounded-none transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#8DC63F] self-end"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Sparkles className="w-5 h-5 mr-2" />
          )}
          GENERAR NOMBRES
        </button>
      </div>

      <AnimatePresence>
        {names.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-heading text-island-lime">Nombres Propuestos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {names.map((name, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col bg-island-dark/40 border border-white/5 p-6 space-y-4 hover:border-island-magenta/30 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-heading text-island-cyan uppercase tracking-wider">{name.title}</h3>
                    <button
                      onClick={() => copyToClipboard(name.title, index)}
                      className="text-white/30 hover:text-island-magenta transition-colors"
                    >
                      {copiedIndex === index ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-white/60 font-body italic">
                    "{name.justification}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
