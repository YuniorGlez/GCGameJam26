"use client";

import { useState } from "react";
import { LifeBuoy, ArrowLeft, MessageSquare, Copy, Check, Users, QrCode } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const MENTORS = [
  {
    name: "Amina Abdien Lareu",
    role: "Layout Design",
    description: "CEO de Quantum Box",
    image: "/mentores/amina.png" // Using placeholder logic or actual if I had individual
  },
  {
    name: "Brendan McCaffrey",
    role: "Artista Digital",
    description: "Enfocado en producción de carátulas y arte promocional de videojuegos. Director creativo de una startup que promueve diseño y desarrollo de videojuegos Browser para jóvenes.",
  },
  {
    name: "Héctor Muñoz García",
    role: "Gestor cultural, diseñador de juegos, compositor",
    description: "Miembro fundador de Paraxit Games",
  },
  {
    name: "Laura del Pino Díaz",
    role: "Gestora de Proyectos e Ingeniera de Inteligencia Artificial",
    description: "",
  },
  {
    name: "Luca Contato",
    role: "CEO Rising Pixel & Game Designer",
    description: "",
  },
  {
    name: "Luis Antón Canalís",
    role: "Diseñador y desarrollador de videojuegos en PlayMedusa",
    description: "",
  },
  {
    name: "Óscar Rivero",
    role: "Compositor musical y profesor de Música para videojuegos en Universidad del Atlántico Medio.",
    description: "",
  },
  {
    name: "Sabrina Purswani",
    role: "Programación Unity, Unreal y Twine",
    description: "",
  },
  {
    name: "Samuel Díaz Reyes",
    role: "Productor y Game Designer en Casual Brothers LTD",
    description: "",
  },
  {
    name: "Sergio Prieto Prado",
    role: "Game Design de Quantum Box",
    description: "",
  },
  {
    name: "Sergio Sánchez Rodríguez",
    role: "Diseñador estratégico y visual. Facilitador de Gran Canaria Game Island JAM",
    description: "",
  },
  {
    name: "Yunior González",
    role: "Desarrollador y docente.",
    description: "Ha lanzado más de 100 proyectos y ahora está al mando de SQUAADS. Especialista en IA y en formaciones de IA.",
  }
];

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
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-12">
      <Link
        href="/"
        className="inline-flex items-center text-island-cyan/70 hover:text-island-cyan transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      {/* Header */}
      <section className="space-y-4 text-center">
        <div className="inline-flex p-3 bg-island-magenta/20 rounded-full text-island-magenta mb-2">
          <LifeBuoy className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-6xl font-heading text-white">S.O.S. <span className="text-island-magenta">Mentores</span></h1>
        <p className="text-foreground/60 font-body max-w-xl mx-auto">
          Prepara tu duda para los mentores o consulta quién puede ayudarte mejor según su especialidad.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Generator */}
        <div className="space-y-8">
          <div className="poster-card p-8 space-y-6">
            <h2 className="text-2xl font-heading text-white flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-island-cyan" /> Resumidor S.O.S.
            </h2>
            <div className="space-y-2">
              <label className="text-xs font-heading text-island-cyan uppercase tracking-wider">Describe tu bloqueo</label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Ej: El player atraviesa las paredes cuando va a mucha velocidad en Unity..."
                className="w-full h-40 bg-island-dark/50 border border-white/10 rounded-none p-6 font-body text-white focus:outline-none focus:border-island-cyan transition-all resize-none shadow-[4px_4px_0px_rgba(0,181,226,0.2)]"
              />
            </div>

            <button
              onClick={generateSummary}
              disabled={loading || !problem}
              className="w-full bg-island-cyan hover:bg-island-cyan/80 text-island-dark font-heading py-4 rounded-none transition-all flex items-center justify-center disabled:opacity-50 shadow-[4px_4px_0px_white]"
            >
              {loading ? "ANALIZANDO BLOQUEO..." : "GENERAR FICHA PARA MENTOR"}
            </button>

            <AnimatePresence>
              {summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-island-cyan/10 border border-island-cyan/30 rounded-none space-y-4 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-island-cyan text-xs font-heading uppercase tracking-tighter">Ficha Lista</span>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-island-cyan/20 rounded-none transition-colors text-island-cyan border border-island-cyan/50"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="text-sm font-body text-white/90 whitespace-pre-wrap leading-relaxed italic">
                    {summary}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* QRs Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="poster-card p-4 text-center space-y-4 border-island-lime/30">
              <h3 className="text-xs font-heading text-island-lime uppercase">Subir a Itch.io</h3>
              <div className="relative aspect-square w-full bg-white p-2">
                <Image src="/qr_itchio.png" alt="QR Itch.io" fill className="object-contain" />
              </div>
            </div>
            <div className="poster-card p-4 text-center space-y-4 border-island-magenta/30">
              <h3 className="text-xs font-heading text-island-magenta uppercase">Info Jammers</h3>
              <div className="relative aspect-square w-full bg-white p-2">
                <Image src="/qr_jammers.png" alt="QR Info" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mentors List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading text-white flex items-center border-b-2 border-island-magenta pb-2 w-fit">
            <Users className="w-6 h-6 mr-3 text-island-magenta" /> Equipo de Mentores
          </h2>
          <div className="grid grid-cols-1 gap-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {MENTORS.map((mentor, i) => (
              <div key={i} className="glass-panel p-4 border-l-4 border-island-magenta hover:bg-white/5 transition-colors">
                <h3 className="text-island-magenta font-heading text-lg leading-tight">{mentor.name}</h3>
                <p className="text-island-cyan text-[10px] font-heading uppercase mt-1">{mentor.role}</p>
                {mentor.description && (
                  <p className="text-white/60 font-body text-xs mt-2 leading-relaxed italic">
                    "{mentor.description}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E52E8A;
        }
      `}</style>
    </div>
  );
}
