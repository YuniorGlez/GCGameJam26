"use client";

import { useState } from "react";
import { Zap, ArrowLeft, Loader2, Code, Clipboard, Check, Lightbulb, Box } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface LogicResponse {
  pseudocodigo: string;
  explicacion_pasos: string[];
  variables_necesarias: string[];
}

export default function TraductorLogicaPage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LogicResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const translateLogic = async () => {
    if (!description) return;
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch("/api/traductor-logica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logicDescription: description }),
      });

      if (!response.ok) throw new Error("Error en la traducción");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.pseudocodigo) {
      navigator.clipboard.writeText(result.pseudocodigo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
        <h1 className="text-4xl font-heading text-white">
          Traductor a <span className="text-island-magenta">Lógica</span>
        </h1>
        <p className="text-foreground/60 font-body">
          Convierte tus ideas de mecánicas en pseudocódigo estructurado y variables listas para programar.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border-island-magenta/30 space-y-4">
            <label className="block text-island-magenta font-heading text-sm">Describe tu lógica (sucio)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: 'Quiero que cuando el jugador toque el cofre, se abra con una animación y suelte 3 monedas, pero solo si tiene la llave roja...'"
              className="w-full h-64 bg-island-abyss/50 border border-white/10 rounded-xl px-4 py-3 font-body text-white focus:outline-none focus:border-island-magenta transition-all resize-none"
            />
            <button
              onClick={translateLogic}
              disabled={loading || !description}
              className="w-full bg-island-magenta hover:bg-island-magenta/80 text-white font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-magenta"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Code className="w-5 h-5 mr-2" />
              )}
              TRADUCIR A LÓGICA
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!result && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/5 rounded-2xl opacity-40"
              >
                <Code className="w-12 h-12 mb-4 text-island-cyan" />
                <p className="font-body italic text-white/60">Esperando descripción de mecánica...</p>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 glass-panel rounded-2xl"
              >
                <Loader2 className="w-12 h-12 mb-4 text-island-magenta animate-spin" />
                <p className="font-heading text-island-magenta animate-pulse">Procesando neuronas...</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Pseudocode Block */}
                <div className="glass-panel overflow-hidden rounded-2xl border-island-cyan/30">
                  <div className="bg-island-cyan/10 px-6 py-3 border-b border-island-cyan/30 flex justify-between items-center">
                    <span className="text-island-cyan font-heading text-xs tracking-widest flex items-center">
                      <Code className="w-4 h-4 mr-2" /> PSEUDOCÓDIGO
                    </span>
                    <button 
                      onClick={copyToClipboard}
                      className="text-white/50 hover:text-island-cyan transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="p-6 font-body text-sm text-island-cyan bg-island-abyss/80 overflow-x-auto">
                    <code>{result.pseudocodigo}</code>
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Variables */}
                  <div className="glass-panel p-5 rounded-xl border-island-lime/30">
                    <h3 className="text-island-lime font-heading text-xs mb-3 flex items-center">
                      <Box className="w-4 h-4 mr-2" /> Variables
                    </h3>
                    <ul className="space-y-2">
                      {result.variables_necesarias.map((v, i) => (
                        <li key={i} className="text-xs font-body text-foreground/80 flex items-start gap-2">
                          <span className="text-island-lime font-bold">•</span> {v}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pasos */}
                  <div className="glass-panel p-5 rounded-xl border-island-cyan/30">
                    <h3 className="text-island-cyan font-heading text-xs mb-3 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" /> Pasos
                    </h3>
                    <ul className="space-y-2">
                      {result.explicacion_pasos.map((p, i) => (
                        <li key={i} className="text-xs font-body text-foreground/80 flex items-start gap-2">
                          <span className="text-island-cyan font-bold">{i+1}.</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
