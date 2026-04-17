"use client";

import { useState } from "react";
import { Music, ArrowLeft, Loader2, Copy, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Keyword {
  en: string;
  es: string;
}

export default function DiccionarioSonidosPage() {
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateKeywords = async () => {
    if (!action) return;
    setLoading(true);
    setKeywords([]);
    setCopiedAll(false);
    
    try {
      const response = await fetch("/api/diccionario-sonidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setKeywords(data.keywords);
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
    const allEn = keywords.map(k => k.en).join(", ");
    navigator.clipboard.writeText(allEn);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
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
        <h1 className="text-4xl font-heading text-white">Diccionario de <span className="text-island-lime">Sonidos</span></h1>
        <p className="text-foreground/60 font-body">
          Encuentra las keywords perfectas para buscar SFX en bancos internacionales.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="Ej: 'Explosión de cristal', 'Pasos en nieve'..."
          className="flex-1 bg-island-dark/50 border border-white/10 rounded-none px-6 py-4 font-body text-white focus:outline-none focus:border-island-lime transition-all"
        />
        <button
          onClick={generateKeywords}
          disabled={loading || !action}
          className="bg-island-lime hover:bg-island-lime/80 text-[#0B1E4D] font-heading px-8 py-4 rounded-none transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#E52E8A]"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Music className="w-5 h-5 mr-2" />
          )}
          SINTETIZAR KEYWORDS
        </button>
      </div>

      <AnimatePresence>
        {keywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading text-island-magenta">Keywords para SFX</h2>
              <button
                onClick={copyAll}
                className="flex items-center text-sm font-body text-island-cyan hover:underline"
              >
                {copiedAll ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                Copiar Todos (EN)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keywords.map((keyword, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex items-center justify-between p-4 bg-island-dark/40 border border-white/5 hover:border-island-lime/30 transition-all"
                >
                  <div className="space-y-1">
                    <span className="text-island-lime font-mono text-lg font-bold">{keyword.en}</span>
                    <p className="text-xs text-white/40 font-body uppercase tracking-widest">{keyword.es}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(keyword.en, index)}
                      className="p-2 bg-white/5 hover:bg-island-cyan/20 text-white transition-colors"
                      title="Copiar inglés"
                    >
                      {copiedIndex === index ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`https://freesound.org/search/?q=${encodeURIComponent(keyword.en)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 hover:bg-island-magenta/20 text-white transition-colors"
                      title="Buscar en Freesound"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-island-magenta/5 border border-island-magenta/20 mt-12">
              <h3 className="text-island-magenta font-heading text-sm mb-4">RECURSOS RECOMENDADOS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="https://freesound.org" target="_blank" className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-body">
                  <ExternalLink className="w-3 h-3" /> Freesound.org
                </a>
                <a href="https://sonniss.com/gameaudiogdc" target="_blank" className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-body">
                  <ExternalLink className="w-3 h-3" /> Sonniss GDC Bundle
                </a>
                <a href="https://kenney.nl/assets/category:Audio" target="_blank" className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-body">
                  <ExternalLink className="w-3 h-3" /> Kenney Assets
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
