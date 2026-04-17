"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  ArrowLeft, 
  Clock, 
  Cpu, 
  Info, 
  Zap, 
  Brain,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

interface EvaluationResult {
  nivel_marron: number;
  puntos_criticos: string[];
  sugerencia_salud_mental: string;
}

const ENGINES = ["Unity", "Godot", "Unreal", "Web (Three.js/Phaser)", "Other"];

export default function MedidorMarrones() {
  const [idea, setIdea] = useState("");
  const [motor, setMotor] = useState("Godot");
  const [horas, setHoras] = useState(24);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/medidor-marrones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, motor, horas_restantes: horas }),
      });

      if (!response.ok) throw new Error("Error en la evaluación");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al calcular el nivel de marrón.");
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: number) => {
    if (level <= 3) return "text-island-lime";
    if (level <= 7) return "text-island-cyan";
    return "text-island-magenta";
  };

  return (
    <main className="relative island-gradient min-h-screen overflow-hidden text-foreground">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-island-magenta/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-island-cyan/10 blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-island-cyan hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al Dashboard</span>
        </Link>

        <section className="mb-12">
          <h1 className="text-4xl md:text-6xl font-heading mb-4 bg-clip-text text-transparent bg-gradient-to-r from-island-magenta to-island-cyan">
            Medidor de Marrones
          </h1>
          <p className="text-foreground/70 font-body max-w-2xl border-l-2 border-island-lime pl-4">
            ¿Tu idea es factible o es un suicidio técnico? El oráculo de las Game Jams evalúa tu scope vs tiempo restante.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <section className="glass-panel p-8 rounded-2xl neon-glow-cyan border-island-cyan/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-island-cyan font-heading text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4" /> La Gran Idea
                </label>
                <textarea
                  required
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  className="w-full h-32 bg-island-abyss border border-island-cyan/30 rounded-lg p-4 font-body text-sm focus:border-island-cyan focus:outline-none transition-all placeholder:text-foreground/30"
                  placeholder="Ej: Un MMO procedimental con físicas de fluidos..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-island-lime font-heading text-sm flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Motor Gráfico
                  </label>
                  <select
                    value={motor}
                    onChange={(e) => setMotor(e.target.value)}
                    className="w-full bg-island-abyss border border-island-lime/30 rounded-lg p-3 font-body text-sm focus:border-island-lime focus:outline-none appearance-none cursor-pointer"
                  >
                    {ENGINES.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-island-magenta font-heading text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Horas Restantes
                  </label>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="1"
                      max="48"
                      value={horas}
                      onChange={(e) => setHoras(parseInt(e.target.value))}
                      className="w-full accent-island-magenta"
                    />
                    <div className="flex justify-between font-body text-xs text-island-magenta">
                      <span>1h (Crunch Final)</span>
                      <span className="text-lg font-heading">{horas}h</span>
                      <span>48h (Inicio)</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-island-cyan text-island-abyss font-heading text-lg rounded-xl shadow-[0_0_20px_rgba(0,181,226,0.5)] hover:shadow-[0_0_30px_rgba(0,181,226,0.8)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Zap className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <>
                    <ScaleIcon className="w-6 h-6" />
                    <span>EVALUAR MARRÓN</span>
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Results Area */}
          <section className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center glass-panel rounded-2xl border-dashed border-island-cyan/20"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -inset-4 bg-island-cyan/20 blur-xl rounded-full"
                    />
                    <Brain className="w-16 h-16 text-island-cyan relative z-10 animate-pulse" />
                  </div>
                  <p className="mt-6 font-heading text-island-cyan animate-pulse">Consultando al Oráculo...</p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="glass-panel p-8 rounded-2xl neon-glow-magenta border-island-magenta/20">
                    <div className="flex flex-col items-center mb-8">
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-island-abyss"
                          />
                          <motion.circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray="502.6"
                            initial={{ strokeDashoffset: 502.6 }}
                            animate={{ strokeDashoffset: 502.6 - (502.6 * result.nivel_marron) / 10 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`${getLevelColor(result.nivel_marron)} transition-colors duration-500`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className={`text-5xl font-heading ${getLevelColor(result.nivel_marron)}`}>
                            {result.nivel_marron}
                          </span>
                          <span className="text-[10px] font-body text-foreground/50">NIVEL DE MARRÓN</span>
                        </div>
                      </div>
                      <h3 className={`mt-4 font-heading text-2xl ${getLevelColor(result.nivel_marron)}`}>
                        {result.nivel_marron > 7 ? "¡PELIGRO EXTREMO!" : result.nivel_marron > 4 ? "TEN CUIDADO" : "PARECE FACTIBLE"}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-heading text-sm text-island-cyan flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Puntos Críticos:
                      </h4>
                      <ul className="space-y-2">
                        {result.puntos_criticos.map((p, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="flex items-start gap-3 p-3 bg-island-abyss/50 rounded-lg border border-island-cyan/10"
                          >
                            <AlertCircle className="w-4 h-4 text-island-magenta mt-0.5 shrink-0" />
                            <span className="text-sm font-body text-foreground/80">{p}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="glass-panel p-6 rounded-2xl border-island-lime/20 flex items-start gap-4">
                    <div className="p-3 bg-island-lime/10 rounded-lg text-island-lime shadow-[0_0_15px_rgba(141,198,63,0.3)]">
                      <Info className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm text-island-lime mb-1">Consejo de Salud Mental:</h4>
                      <p className="text-sm font-body italic text-foreground/70">&quot;{result.sugerencia_salud_mental}&quot;</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center glass-panel rounded-2xl border-dashed border-island-cyan/20 text-foreground/30 text-center p-8">
                  <ScaleIcon className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-body italic text-sm">Introduce los datos de tu idea para recibir la evaluación del oráculo.</p>
                </div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </main>
  );
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="M7 21h10"/>
      <path d="M12 3v18"/>
      <path d="M3 7h18"/>
    </svg>
  );
}
