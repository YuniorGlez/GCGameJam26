"use client";

import { useState } from "react";
import { Mic, ArrowLeft, Loader2, Copy, Check, FileText } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface PitchScript {
  hook: string;
  problem: string;
  solution: string;
  usp: string;
  team: string;
  totalTime: string;
}

export default function GuionPitchPage() {
  const [gameDetails, setGameDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<PitchScript | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const generatePitch = async () => {
    if (!gameDetails) return;
    setLoading(true);
    setScript(null);
    
    try {
      const response = await fetch("/api/guion-pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameDetails }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setScript(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
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
        <h1 className="text-4xl font-heading text-white">Guion del <span className="text-island-lime">Pitch</span></h1>
        <p className="text-foreground/60 font-body">
          Estructura tu pitch de 2 minutos para impresionar al jurado.
        </p>
      </section>

      <div className="flex flex-col gap-4">
        <textarea
          value={gameDetails}
          onChange={(e) => setGameDetails(e.target.value)}
          placeholder="Introduce detalles del juego, mecánicas clave y quiénes sois..."
          className="w-full bg-island-dark/50 border border-white/10 rounded-none px-6 py-4 font-body text-white focus:outline-none focus:border-island-lime transition-all min-h-[150px]"
        />
        <button
          onClick={generatePitch}
          disabled={loading || !gameDetails}
          className="bg-island-lime hover:bg-island-lime/80 text-island-dark font-heading px-8 py-4 rounded-none transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_#E52E8A] self-end"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Mic className="w-5 h-5 mr-2" />
          )}
          GENERAR GUION
        </button>
      </div>

      <AnimatePresence>
        {script && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center border-b border-island-lime/20 pb-4">
              <h2 className="text-2xl font-heading text-island-lime">Guion Estructurado</h2>
              <span className="text-sm font-mono text-island-magenta">Tiempo Estimado: 2:00</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "Hook (0:00 - 0:20)", content: script.hook, key: "hook" },
                { title: "Problema (0:20 - 0:45)", content: script.problem, key: "problem" },
                { title: "Solución (0:45 - 1:15)", content: script.solution, key: "solution" },
                { title: "USP (1:15 - 1:45)", content: script.usp, key: "usp" },
                { title: "Equipo y Cierre (1:45 - 2:00)", content: script.team, key: "team" },
              ].map((section) => (
                <div key={section.key} className="bg-island-dark/40 border border-white/5 p-6 relative group">
                  <button
                    onClick={() => copyToClipboard(section.content, section.key)}
                    className="absolute top-4 right-4 text-white/20 hover:text-island-lime transition-colors"
                  >
                    {copiedSection === section.key ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <h3 className="text-island-magenta font-heading text-sm uppercase mb-2 tracking-widest">{section.title}</h3>
                  <p className="text-white font-body leading-relaxed whitespace-pre-wrap">{section.content}</p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => {
                const fullPitch = `PITCH ESTRUCTURADO\n\nHOOK:\n${script.hook}\n\nPROBLEMA:\n${script.problem}\n\nSOLUCION:\n${script.solution}\n\nUSP:\n${script.usp}\n\nEQUIPO Y CIERRE:\n${script.team}`;
                copyToClipboard(fullPitch, 'all');
              }}
              className="w-full py-4 border border-island-lime text-island-lime font-heading hover:bg-island-lime hover:text-island-dark transition-all"
            >
              {copiedSection === 'all' ? "¡COPIADO!" : "COPIAR PITCH COMPLETO"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
