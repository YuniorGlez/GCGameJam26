"use client";

import { useState } from "react";
import { LifeBuoy, ArrowLeft, MessageSquare, Copy, Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SOSPage() {
  const [problem, setProblem] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    if (!problem) return;
    setLoading(true);
    
    // Simulación de razonamiento multimodal de Gemini
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const mockSummary = `[S.O.S. MENTOR]
CONTEXTO: El equipo está atascado con la lógica de colisión en el MVP.
PROBLEMA: ${problem}
DRENAJE DE TIEMPO: Alto (bloqueando integración de assets).
SOLICITUD: Revisión del script de físicas y sugerencia de optimización para Godot/Unity.`;
    
    setSummary(mockSummary);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-island-neon/70 hover:text-island-neon transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4 text-center">
        <div className="inline-flex p-3 bg-island-blue/20 rounded-full text-island-blue mb-2">
          <LifeBuoy className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-heading text-white">S.O.S. <span className="text-island-blue">Mentores</span></h1>
        <p className="text-foreground/60 font-body">
          Resume tu problema técnico para ir directo al grano cuando el mentor llegue a tu mesa.
        </p>
      </section>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-heading text-island-blue uppercase">Describe el problema (sucio)</label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Escribe aquí lo que está fallando (ej: 'el player se cae del suelo cuando salta contra la pared y no se por que')..."
            className="w-full h-40 bg-island-dark/50 border border-white/10 rounded-xl p-6 font-body text-white focus:outline-none focus:border-island-blue transition-all resize-none"
          />
        </div>

        <button
          onClick={generateSummary}
          disabled={loading || !problem}
          className="w-full bg-island-blue hover:bg-blue-600 text-white font-heading py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
        >
          {loading ? "PROCESANDO CON GEMINI..." : "GENERAR RESUMEN PARA MENTOR"}
        </button>

        <AnimatePresence>
          {summary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-island-blue/10 border border-island-blue/30 rounded-xl space-y-4 relative"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center text-island-blue text-xs font-heading">
                  <MessageSquare className="w-4 h-4 mr-2" /> RESUMEN GENERADO
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-island-blue/20 rounded-lg transition-colors text-island-blue"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="text-sm font-body text-white/90 whitespace-pre-wrap leading-relaxed">
                {summary}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
