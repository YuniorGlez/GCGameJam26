"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Zap, ArrowLeft, Loader2, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ChecklistItem {
  title: string;
  description: string;
  priority: "Alta" | "Media" | "Baja";
  completed?: boolean;
}

const ENGINES = ["Unity", "Godot", "Unreal Engine", "Web (JS/TS/Phaser)", "GameMaker", "Otros"];

export default function ChecklistRendimientoPage() {
  const [engine, setEngine] = useState("");
  const [issues, setIssues] = useState("");
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateChecklist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!engine || isLoading) return;

    setIsLoading(true);
    setError(null);
    setItems([]);

    try {
      const response = await fetch("/api/checklist-rendimiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engine, issues }),
      });

      if (!response.ok) throw new Error("Error al generar el checklist");

      const data = await response.json();
      setItems(data.items.map((item: any) => ({ ...item, completed: false })));
    } catch (err) {
      console.error(err);
      setError("No pudimos conectar con el experto en rendimiento. Revisa tu conexión de crunch.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleItem = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item))
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "text-island-magenta";
      case "Media": return "text-island-cyan";
      case "Baja": return "text-island-lime";
      default: return "text-white";
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      <Link
        href="/"
        className="flex items-center gap-2 text-island-cyan hover:text-white transition-colors mb-8 w-fit group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-heading text-sm uppercase tracking-widest">Volver al Radar</span>
      </Link>

      <header className="mb-12 space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-island-lime/20 text-island-lime shadow-[4px_4px_0px_currentColor]">
            <Gauge className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading text-white neon-text-lime uppercase italic">
            Checklist de <span className="text-island-cyan">Rendimiento</span>
          </h1>
        </div>
        <p className="text-white/60 font-body max-w-2xl text-lg">
          Optimiza tu juego para el crunch final. Selecciona tu motor y cuéntanos qué te va lento.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <section className="lg:col-span-5 space-y-6">
          <div className="poster-card p-6 border-island-lime/30 bg-black/40">
            <form onSubmit={generateChecklist} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-island-cyan font-heading text-sm uppercase tracking-wider">
                  Motor de Juego
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ENGINES.map((eng) => (
                    <button
                      key={eng}
                      type="button"
                      onClick={() => setEngine(eng)}
                      className={`p-3 text-xs font-heading border transition-all ${
                        engine === eng
                          ? "bg-island-cyan text-island-dark border-island-cyan shadow-[0_0_15px_rgba(0,181,226,0.4)]"
                          : "bg-transparent text-white/60 border-white/10 hover:border-island-cyan/50"
                      }`}
                    >
                      {eng}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-island-magenta font-heading text-sm uppercase tracking-wider">
                  Problemas o Enfoque (Opcional)
                </label>
                <textarea
                  value={issues}
                  onChange={(e) => setIssues(e.target.value)}
                  placeholder="Ej: El WebGL tarda mucho en cargar, tirones al saltar, texturas borrosas..."
                  className="w-full bg-island-dark/50 border border-white/10 p-4 font-body text-white focus:outline-none focus:border-island-magenta transition-colors h-32 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!engine || isLoading}
                className="w-full bg-island-lime text-island-dark py-4 font-heading font-bold flex items-center justify-center gap-2 hover:bg-white hover:shadow-[0_0_20px_rgba(141,198,63,0.5)] transition-all disabled:opacity-50 disabled:grayscale group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    GENERANDO PLAN...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    OBTENER CHECKLIST
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="glass-panel p-6 border-white/5 italic text-white/50 text-sm font-body">
            <p>
              TIP: Para Web/HTML5, prioriza siempre el tamaño de las texturas y la compresión de audio. Los primeros 10 segundos de carga deciden si juegan a tu juego o pasan al siguiente.
            </p>
          </div>
        </section>

        {/* Results Section */}
        <section className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-64 flex flex-col items-center justify-center space-y-4 poster-card border-dashed border-island-cyan/30"
              >
                <div className="relative">
                  <Gauge className="w-12 h-12 text-island-cyan animate-pulse" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-island-cyan border-t-transparent rounded-full"
                  />
                </div>
                <p className="font-heading text-island-cyan animate-pulse tracking-widest uppercase">Analizando Cuellos de Botella...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 poster-card border-island-magenta/50 text-center space-y-4"
              >
                <AlertCircle className="w-12 h-12 text-island-magenta mx-auto" />
                <p className="text-white font-body">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="text-island-cyan font-heading text-sm hover:underline"
                >
                  REINTENTAR
                </button>
              </motion.div>
            ) : items.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-heading text-white flex items-center gap-2 mb-6 uppercase tracking-tight">
                  <CheckCircle2 className="text-island-lime w-6 h-6" />
                  Tu Plan de <span className="text-island-lime">Optimización</span>
                </h2>
                
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => toggleItem(index)}
                      className={`poster-card p-5 cursor-pointer transition-all border-l-4 group ${
                        item.completed 
                          ? "opacity-50 grayscale border-white/20 bg-white/5" 
                          : `border-l-${getPriorityColor(item.priority).split('-')[1]}-${getPriorityColor(item.priority).split('-')[2] || ''} hover:bg-white/5`
                      }`}
                      style={{ 
                        borderLeftColor: item.completed ? 'rgba(255,255,255,0.2)' : 
                          item.priority === "Alta" ? "#E52E8A" : 
                          item.priority === "Media" ? "#00B5E2" : "#8DC63F" 
                      }}
                    >
                      <div className="flex gap-4">
                        <div className="mt-1">
                          {item.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-island-lime" />
                          ) : (
                            <Circle className="w-6 h-6 text-white/20 group-hover:text-white/40" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-heading text-lg leading-none ${item.completed ? 'line-through text-white/40' : 'text-white'}`}>
                              {item.title}
                            </h3>
                            <span className={`text-[10px] font-heading px-2 py-0.5 border ${getPriorityColor(item.priority)} border-current opacity-70`}>
                              {item.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className={`font-body text-sm ${item.completed ? 'text-white/20' : 'text-white/60'}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="pt-6">
                  <p className="text-white/30 text-[10px] font-heading text-center uppercase tracking-[0.3em]">
                    Finaliza todas las tareas para un rendimiento de elite
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-12 poster-card border-island-cyan/10 opacity-30 text-center space-y-4 border-dashed">
                <Gauge className="w-16 h-16 text-island-cyan" />
                <p className="font-heading text-white">Configura tu motor para ver el checklist</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
