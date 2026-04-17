"use client";

import { useState } from "react";
import { Zap, ArrowLeft, Loader2, Palette, Volume2, Lightbulb, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface AssetList {
  lista_arte: string[];
  lista_sonido: string[];
  consejo_estilo: string;
}

export default function ListaCompraAssetsPage() {
  const [concept, setConcept] = useState("");
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<AssetList | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const generateAssets = async () => {
    if (!concept) return;
    setLoading(true);
    setAssets(null);
    setCheckedItems({});
    
    try {
      const response = await fetch("/api/lista-compra-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept }),
      });

      if (!response.ok) throw new Error("Error en la generación");

      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8 min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center text-island-cyan/70 hover:text-island-cyan transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <h1 className="text-4xl font-heading text-white">Lista de la Compra <span className="text-island-cyan">(Assets)</span></h1>
        <p className="text-foreground/60 font-body">
          Define tu concepto y obtén la lista minimalista de arte y sonido necesaria para tu MVP de 48h.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Ej: 'Plataformas 2D de un gato en el espacio'..."
          className="flex-1 bg-island-dark/50 border border-island-cyan/20 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-cyan transition-all"
        />
        <button
          onClick={generateAssets}
          disabled={loading || !concept}
          className="bg-island-cyan hover:bg-island-cyan/80 text-white font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-cyan"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Zap className="w-5 h-5 mr-2" />
          )}
          GENERAR LISTA
        </button>
      </div>

      <AnimatePresence>
        {assets && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Advice Section */}
            <div className="p-6 bg-island-lime/10 border border-island-lime/30 rounded-xl flex items-start gap-4">
              <div className="p-2 bg-island-lime/20 rounded-lg text-island-lime">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-island-lime text-sm uppercase">Consejo de Estilo</h3>
                <p className="font-body text-foreground/80">{assets.consejo_estilo}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Art List */}
              <div className="glass-panel p-6 rounded-2xl border-island-cyan/30 space-y-6">
                <div className="flex items-center gap-3 border-b border-island-cyan/20 pb-4">
                  <Palette className="w-6 h-6 text-island-cyan" />
                  <h2 className="text-xl font-heading text-white tracking-wider">Arte Innegociable</h2>
                </div>
                <ul className="space-y-3">
                  {assets.lista_arte.map((item, i) => (
                    <li 
                      key={i} 
                      onClick={() => toggleItem(`art-${i}`)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        checkedItems[`art-${i}`] ? 'bg-island-cyan/20 border-island-cyan/40' : 'bg-island-dark/40 border-white/5'
                      } border hover:border-island-cyan/30`}
                    >
                      <CheckCircle2 className={`w-5 h-5 ${checkedItems[`art-${i}`] ? 'text-island-cyan' : 'text-foreground/20'}`} />
                      <span className={`font-body text-sm ${checkedItems[`art-${i}`] ? 'text-white line-through opacity-50' : 'text-foreground/90'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sound List */}
              <div className="glass-panel p-6 rounded-2xl border-island-magenta/30 space-y-6">
                <div className="flex items-center gap-3 border-b border-island-magenta/20 pb-4">
                  <Volume2 className="w-6 h-6 text-island-magenta" />
                  <h2 className="text-xl font-heading text-white tracking-wider">Sonido & FX</h2>
                </div>
                <ul className="space-y-3">
                  {assets.lista_sonido.map((item, i) => (
                    <li 
                      key={i} 
                      onClick={() => toggleItem(`sound-${i}`)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        checkedItems[`sound-${i}`] ? 'bg-island-magenta/20 border-island-magenta/40' : 'bg-island-dark/40 border-white/5'
                      } border hover:border-island-magenta/30`}
                    >
                      <CheckCircle2 className={`w-5 h-5 ${checkedItems[`sound-${i}`] ? 'text-island-magenta' : 'text-foreground/20'}`} />
                      <span className={`font-body text-sm ${checkedItems[`sound-${i}`] ? 'text-white line-through opacity-50' : 'text-foreground/90'}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
