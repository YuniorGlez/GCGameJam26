"use client";

import { useState } from "react";
import { FileText, ArrowLeft, Loader2, Copy, Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Summary {
  story: string;
  features: string[];
  controls: string[];
  credits: string[];
}

export default function ResumenEntregaPage() {
  const [logs, setLogs] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    if (!logs) return;
    setLoading(true);
    setSummary(null);
    
    try {
      const response = await fetch("/api/resumen-entrega", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!summary) return;

    const text = `
# Story
${summary.story}

# Features
${summary.features.map(f => `- ${f}`).join("\n")}

# Controls
${summary.controls.map(c => `- ${c}`).join("\n")}

# Credits
${summary.credits.map(c => `- ${c}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-island-magenta/70 hover:text-island-magenta transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <h1 className="text-4xl font-heading text-white">Resumen de <span className="text-island-magenta">Entrega</span></h1>
        <p className="text-foreground/60 font-body">
          Convierte tus notas de desarrollo en una descripción profesional para Itch.io.
        </p>
      </section>

      <div className="space-y-4">
        <textarea
          value={logs}
          onChange={(e) => setLogs(e.target.value)}
          placeholder="Pega aquí tus notas, logs de commits o lista de tareas finalizadas..."
          className="w-full h-48 bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-magenta transition-all resize-none"
        />
        <button
          onClick={generateSummary}
          disabled={loading || !logs}
          className="w-full bg-island-magenta hover:bg-island-magenta/80 text-white font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-magenta"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <FileText className="w-5 h-5 mr-2" />
          )}
          GENERAR DESCRIPCIÓN FINAL
        </button>
      </div>

      <AnimatePresence>
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-island-dark/60 border border-island-magenta/20 rounded-xl space-y-6 relative glass-panel"
          >
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
              title="Copiar al portapapeles"
            >
              {copied ? (
                <Check className="w-5 h-5 text-island-lime" />
              ) : (
                <Copy className="w-5 h-5 text-white/50 group-hover:text-white" />
              )}
            </button>

            <div className="space-y-2">
              <h3 className="text-sm font-heading text-island-magenta">Historia / Premisa</h3>
              <p className="text-sm font-body text-foreground/80 leading-relaxed">{summary.story}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-heading text-island-cyan">Características</h3>
                <ul className="text-xs font-body text-foreground/60 space-y-1">
                  {summary.features.map((f, i) => <li key={i}>• {f}</li>)}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-heading text-island-lime">Controles</h3>
                <ul className="text-xs font-body text-foreground/60 space-y-1">
                  {summary.controls.map((c, i) => <li key={i}>• {c}</li>)}
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/5">
              <h3 className="text-sm font-heading text-white/40">Créditos</h3>
              <ul className="text-xs font-body text-foreground/40 flex flex-wrap gap-x-4">
                {summary.credits.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
