"use client";

import { useState } from "react";
import { Zap, ArrowLeft, Loader2, BookOpen, Repeat } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface TranslationResult {
  termino_equivalente: string;
  explicacion_diferencias: string;
  ejemplo_uso: string;
}

const ENGINES = ["Unity", "Godot", "Unreal Engine"];

export default function DiccionarioMotoresPage() {
  const [concepto, setConcepto] = useState("");
  const [motorOrigen, setMotorOrigen] = useState("Unity");
  const [motorDestino, setMotorDestino] = useState("Godot");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);

  const translateConcept = async () => {
    if (!concepto || !motorOrigen || !motorDestino) return;
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch("/api/diccionario-motores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          concepto, 
          motor_origen: motorOrigen, 
          motor_destino: motorDestino 
        }),
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

  const swapEngines = () => {
    setMotorOrigen(motorDestino);
    setMotorDestino(motorOrigen);
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
        <h1 className="text-4xl font-heading text-white">Diccionario <span className="text-island-lime italic">entre Motores</span></h1>
        <p className="text-foreground/60 font-body max-w-2xl">
          ¿Vienes de Unity pero estás en Godot? ¿O quizás Unreal? Traduce conceptos y encuentra equivalencias al instante para no frenar tu crunch.
        </p>
      </section>

      <div className="glass-panel p-8 rounded-2xl space-y-6 neon-glow-lime">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-end">
          <div className="md:col-span-4 space-y-2">
            <label className="text-[10px] font-heading text-island-cyan uppercase tracking-widest px-2">Motor Origen</label>
            <select
              value={motorOrigen}
              onChange={(e) => setMotorOrigen(e.target.value)}
              className="w-full bg-island-dark/50 border border-white/10 rounded-xl px-4 py-3 font-body text-white focus:outline-none focus:border-island-cyan transition-all appearance-none cursor-pointer"
            >
              {ENGINES.map(engine => (
                <option key={engine} value={engine} className="bg-island-dark text-white">{engine}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1 flex justify-center pb-2">
            <button 
              onClick={swapEngines}
              className="p-3 rounded-full bg-white/5 hover:bg-island-magenta/20 text-island-magenta transition-all border border-white/5 hover:border-island-magenta/30 shadow-lg group"
              title="Intercambiar motores"
            >
              <Repeat className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>

          <div className="md:col-span-4 space-y-2">
            <label className="text-[10px] font-heading text-island-lime uppercase tracking-widest px-2">Motor Destino</label>
            <select
              value={motorDestino}
              onChange={(e) => setMotorDestino(e.target.value)}
              className="w-full bg-island-dark/50 border border-white/10 rounded-xl px-4 py-3 font-body text-white focus:outline-none focus:border-island-lime transition-all appearance-none cursor-pointer"
            >
              {ENGINES.map(engine => (
                <option key={engine} value={engine} className="bg-island-dark text-white">{engine}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-heading text-island-magenta uppercase tracking-widest px-2">Concepto a Traducir</label>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder="Ej: Prefab, ScriptableObject, Blueprint, Scene Tree..."
              className="flex-1 bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-magenta transition-all"
            />
            <button
              onClick={translateConcept}
              disabled={loading || !concepto || motorOrigen === motorDestino}
              className="bg-island-lime hover:bg-island-cyan text-island-dark font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-lime min-w-[200px]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Zap className="w-5 h-5 mr-2" />
              )}
              TRADUCIR
            </button>
          </div>
          {motorOrigen === motorDestino && concepto && (
            <p className="text-[10px] text-island-magenta/70 font-body px-2">Selecciona motores diferentes para traducir.</p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-xl border-l-4 border-l-island-lime space-y-4">
                <div className="flex items-center gap-3 text-island-lime">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-heading text-lg uppercase tracking-wider">Término Equivalente</h3>
                </div>
                <div className="bg-island-lime/10 p-4 rounded-lg border border-island-lime/20">
                  <p className="text-2xl font-heading text-white">{result.termino_equivalente}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-heading text-island-cyan uppercase tracking-widest">Diferencias clave</span>
                  <p className="text-sm font-body text-foreground/80 leading-relaxed">
                    {result.explicacion_diferencias}
                  </p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl border-l-4 border-l-island-magenta space-y-4">
                <div className="flex items-center gap-3 text-island-magenta">
                  <Zap className="w-5 h-5" />
                  <h3 className="font-heading text-lg uppercase tracking-wider">Ejemplo de Uso</h3>
                </div>
                <div className="bg-island-dark/80 p-4 rounded-lg border border-white/5 h-full">
                  <pre className="text-xs font-mono text-island-cyan whitespace-pre-wrap leading-relaxed">
                    {result.ejemplo_uso}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && !result && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-12 h-12 text-island-lime animate-spin" />
          <p className="font-heading text-white animate-pulse tracking-widest uppercase text-xs">Consultando el oráculo de motores...</p>
        </div>
      )}
    </div>
  );
}
