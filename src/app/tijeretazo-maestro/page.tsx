"use client";

import { useState, useEffect } from "react";
import { Scissors, Shield, Trash2, ArrowLeft, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface SacredFeature {
  feature: string;
  impacto: string;
}

interface DisposableFeature {
  feature: string;
  riesgo_si_se_mantiene: string;
}

interface CutResult {
  lista_sagrada: SacredFeature[];
  lista_descartable: DisposableFeature[];
  razonamiento_economico: string;
}

export default function TijeretazoMaestro() {
  const [description, setDescription] = useState("");
  const [hoursRemaining, setHoursRemaining] = useState<number>(48);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CutResult | null>(null);

  // Sync hours from actual target date if possible
  useEffect(() => {
    const targetDate = new Date("2026-04-19T15:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance > 0) {
      const hrs = Math.floor(distance / (1000 * 60 * 60));
      setHoursRemaining(hrs);
    }
  }, []);

  const handleCut = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/tijeretazo-maestro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, hoursRemaining }),
      });

      if (!response.ok) throw new Error("Failed to get advice");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error al contactar con el Maestro. ¿Quizás el scope es demasiado grande?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative island-gradient min-h-screen p-4 md:p-8 font-body">
      {/* Decorative Pixels */}
      <div className="absolute top-10 right-10 w-4 h-4 bg-island-magenta animate-pulse shadow-[0_0_15px_rgba(229,46,138,0.8)] rotate-45" />
      <div className="absolute bottom-10 left-10 w-3 h-3 bg-island-lime animate-bounce shadow-[0_0_10px_rgba(141,198,63,0.8)]" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-island-cyan hover:neon-text-cyan transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Dashboard</span>
          </Link>
          <div className="px-3 py-1 bg-island-magenta/10 border border-island-magenta/30 rounded-full text-island-magenta text-[10px] font-heading neon-glow-magenta tracking-widest uppercase">
            Gestión de Alcance
          </div>
        </div>

        <section className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-heading text-white flex items-center gap-4">
            <Scissors className="w-10 h-10 md:w-16 md:h-16 text-island-magenta" />
            Tijeretazo <span className="text-island-magenta italic">Maestro</span>
          </h1>
          <p className="text-foreground/70 max-w-2xl border-l-2 border-island-cyan pl-4 py-1">
            Cuando el reloj aprieta, el Maestro corta. Define tu juego y el tiempo que te queda para recibir un plan de recortes drástico.
          </p>
        </section>

        {/* Input Form */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
          <form onSubmit={handleCut} className="space-y-6">
            <div className="space-y-2">
              <label className="text-island-cyan text-sm font-heading uppercase tracking-wider">¿Qué estás cocinando?</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Un shooter de arena donde eres un coco que lanza zumo a turistas poseídos, con sistema de combos, tienda de skins y multijugador..."
                className="w-full h-32 bg-island-abyss/50 border border-white/10 rounded-xl p-4 text-white focus:border-island-magenta outline-none transition-all resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-island-lime text-sm font-heading uppercase tracking-wider">Horas restantes: {hoursRemaining}</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={hoursRemaining}
                  onChange={(e) => setHoursRemaining(parseInt(e.target.value))}
                  className="w-full accent-island-lime"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-island-magenta hover:bg-island-magenta/80 text-white font-heading py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(229,46,138,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Afilando tijeras...
                    </>
                  ) : (
                    <>
                      <Scissors className="w-5 h-5" />
                      Realizar Tijeretazo
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Economic Reasoning */}
            <div className="p-6 bg-island-cyan/5 border border-island-cyan/20 rounded-2xl flex gap-4">
              <Sparkles className="w-8 h-8 text-island-cyan shrink-0" />
              <div>
                <h3 className="text-island-cyan font-heading text-sm uppercase mb-1">Análisis de Supervivencia</h3>
                <p className="text-foreground/90 leading-relaxed italic">"{result.razonamiento_economico}"</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Sacred List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-heading text-island-lime flex items-center gap-3">
                  <Shield className="w-6 h-6" /> Lo Sagrado (MVP)
                </h2>
                <div className="space-y-3">
                  {result.lista_sagrada.map((item, i) => (
                    <div key={i} className="glass-panel p-4 rounded-xl border-l-4 border-island-lime">
                      <h4 className="text-white font-bold mb-1">{item.feature}</h4>
                      <p className="text-xs text-foreground/60">{item.impacto}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disposable List */}
              <div className="space-y-4">
                <h2 className="text-2xl font-heading text-island-magenta flex items-center gap-3">
                  <Trash2 className="w-6 h-6" /> Al Tijeretazo
                </h2>
                <div className="space-y-3">
                  {result.lista_descartable.map((item, i) => (
                    <div key={i} className="glass-panel p-4 rounded-xl border-l-4 border-island-magenta bg-island-magenta/5">
                      <h4 className="text-white font-bold mb-1">{item.feature}</h4>
                      <p className="text-xs text-foreground/60 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-island-magenta" />
                        {item.riesgo_si_se_mantiene}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center pb-12">
              <p className="text-[10px] text-foreground/40 uppercase tracking-tighter">
                * El Maestro no se hace responsable de las lágrimas de tu game designer.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
