"use client";

import { useState } from "react";
import { PlusCircle, ArrowLeft, Loader2, Lightbulb, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Expansion {
  titulo: string;
  descripcion: string;
  porque_funciona: string;
}

export default function YSiAdemasPage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [expansiones, setExpansiones] = useState<Expansion[]>([]);

  const expandirIdea = async () => {
    if (!idea) return;
    setLoading(true);
    setExpansiones([]);
    
    try {
      const response = await fetch("/api/y-si-ademas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) throw new Error("Error en la expansión");

      const data = await response.json();
      setExpansiones(data.expansiones);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-4xl font-heading text-white">
          &quot;¿Y si <span className="text-island-magenta">además...</span>?&quot;
        </h1>
        <p className="text-foreground/60 font-body border-l-2 border-island-magenta pl-4">
          La técnica definitiva para cuando tienes una base sólida pero te falta ese &quot;algo&quot; especial. 
          Expande tu núcleo sin perder el foco.
        </p>
      </section>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Introduce tu idea base (ej: 'Un juego de plataformas donde controlas a un pingüino en el desierto')..."
            className="w-full h-32 bg-island-dark/50 border border-white/10 rounded-xl px-6 py-4 font-body text-white focus:outline-none focus:border-island-magenta transition-all resize-none"
          />
          <Lightbulb className="absolute bottom-4 right-4 text-island-magenta/30 w-6 h-6" />
        </div>
        <button
          onClick={expandirIdea}
          disabled={loading || !idea}
          className="bg-island-magenta hover:bg-magenta-600 text-white font-heading px-8 py-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed neon-glow-magenta"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <PlusCircle className="w-5 h-5 mr-2" />
          )}
          ¡EXPANDIR IDEA!
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {expansiones.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 rounded-xl border-l-4 border-island-magenta group relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles className="w-40 h-40 text-island-magenta" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-island-magenta/20 flex items-center justify-center text-island-magenta font-heading text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-heading text-white">{exp.titulo}</h3>
                </div>
                
                <p className="text-foreground/90 font-body leading-relaxed">
                  {exp.descripcion}
                </p>
                
                <div className="p-4 bg-island-magenta/5 rounded-lg border border-island-magenta/20">
                  <span className="text-[10px] font-heading text-island-cyan uppercase tracking-widest block mb-1">
                    ¿Por qué funciona?
                  </span>
                  <p className="text-sm font-body text-foreground/70 italic">
                    {exp.porque_funciona}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
