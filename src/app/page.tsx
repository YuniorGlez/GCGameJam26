import { Countdown } from "@/components/ui/Countdown";
import { Zap, Map, LifeBuoy, BookOpen, Clock, Sparkles, PlusCircle, Scale, Scissors, Hammer, AlertTriangle, ShoppingCart, Code } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-0 max-w-5xl relative">
          <div className="text-white text-3xl md:text-5xl font-heading mb-0 tracking-[0.2em] drop-shadow-md">
            GRAN CANARIA
          </div>
          
          <div className="relative py-4">
            <h1 className="text-7xl md:text-[10rem] font-heading leading-[0.8] neon-pipe-text tracking-tighter">
              GAME<br />
              ISLAND
            </h1>
            <div className="text-4xl md:text-7xl font-heading glitch-text mt-4 tracking-[0.5em] text-white">
              JAM
            </div>
          </div>

          {/* The White Date Bar from the poster */}
          <div className="w-full bg-white py-4 md:py-8 my-12 transform -rotate-1 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
              <div className="text-4xl md:text-7xl font-heading text-[#0B1E4D] tracking-tighter">
                17 <span className="text-island-cyan">+</span> 18 <span className="text-island-magenta">+</span> 19
              </div>
              <div className="text-3xl md:text-6xl font-heading text-island-lime">
                ABRIL 2026
              </div>
            </div>
          </div>

          <div className="text-2xl md:text-5xl font-heading text-white italic tracking-tight drop-shadow-xl mt-8">
            ¿Eres capaz de crear un videojuego en <span className="text-island-lime neon-text-lime">48 horas</span>?
          </div>
        </section>

        {/* Main UI */}
        <div className="w-full max-w-5xl space-y-24">
          <div className="poster-card p-12 rounded-none transform rotate-1">
            <Countdown />
          </div>

          {/* Category: Ideación */}
          <section className="space-y-10">
            <h2 className="text-4xl font-heading text-white border-b-4 border-island-cyan w-fit pr-12 pb-2">
              FASE 1: IDEACIÓN
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <Link href="/brainstorm">
                <ModuleCard
                  title="Arranque Explosivo"
                  description="Transforma el tema de la Jam en conceptos viables."
                  icon={<Sparkles className="w-6 h-6" />}
                  accent="island-cyan"
                />
              </Link>
              <Link href="/y-si-ademas">
                <ModuleCard
                  title="¿Y si además...?"
                  description="Expande tu núcleo sin perder el foco del MVP."
                  icon={<PlusCircle className="w-6 h-6" />}
                  accent="island-magenta"
                />
              </Link>
              <Link href="/mezcla-generos">
                <ModuleCard
                  title="Mezcla de Géneros"
                  description="Crea conceptos híbridos rompedores."
                  icon={<Zap className="w-6 h-6" />}
                  accent="island-lime"
                />
              </Link>
              <Link href="/generador-limbo">
                <ModuleCard
                  title="Generador de Limbo"
                  description="Resuelve dudas y encuentra el punto medio."
                  icon={<Scale className="w-6 h-6" />}
                  accent="island-cyan"
                />
              </Link>
              <Link href="/inspiracion-restriccion">
                <ModuleCard
                  title="Inspiración x Restricción"
                  description="Forzando límites de diseño."
                  icon={<Zap className="w-6 h-6" />}
                  accent="island-magenta"
                />
              </Link>
            </div>
          </section>

          {/* Category: Gestión */}
          <section className="space-y-10">
            <h2 className="text-4xl font-heading text-white border-b-4 border-island-lime w-fit pr-12 pb-2">
              FASE 2: ALCANCE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/roadmap">
                <ModuleCard
                  title="Roadmap 48h"
                  description="Cronograma crítico y feature freeze."
                  icon={<Clock className="w-6 h-6" />}
                  accent="island-lime"
                />
              </Link>
              <Link href="/arquitecto-mvp">
                <ModuleCard
                  title="Arquitecto del MVP"
                  description="Las 3 mecánicas sagradas innegociables."
                  icon={<Hammer className="w-6 h-6" />}
                  accent="island-magenta"
                />
              </Link>
              <Link href="/giro-inesperado">
                <ModuleCard
                  title="El Giro Inesperado"
                  description="Regla disruptiva para destacar."
                  icon={<Zap className="w-6 h-6" />}
                  accent="island-magenta"
                />
              </Link>
              <Link href="/tijeretazo-maestro">
                <ModuleCard
                  title="Tijeretazo Maestro"
                  description="Qué eliminar cuando no hay tiempo."
                  icon={<Scissors className="w-6 h-6" />}
                  accent="island-cyan"
                />
              </Link>
              <Link href="/medidor-marrones">
                <ModuleCard
                  title="Medidor de Marrones"
                  description="¿Es realmente factible tu idea?"
                  icon={<AlertTriangle className="w-6 h-6" />}
                  accent="island-lime"
                />
              </Link>
              <Link href="/lista-compra-assets">
                <ModuleCard
                  title="Lista de la Compra"
                  description="Assets de arte y sonido esenciales."
                  icon={<ShoppingCart className="w-6 h-6" />}
                  accent="island-cyan"
                />
              </Link>
            </div>
          </section>

          {/* Category: Desarrollo */}
          <section className="space-y-10">
            <h2 className="text-4xl font-heading text-white border-b-4 border-island-cyan w-fit pr-12 pb-2">
              FASE 3: TÉCNICO
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/traductor-logica">
                <ModuleCard
                  title="Traductor a Lógica"
                  description="De lenguaje humano a pseudocódigo."
                  icon={<Code className="w-6 h-6" />}
                  accent="island-magenta"
                />
              </Link>
              <Link href="/diccionario-motores">
                <ModuleCard
                  title="Diccionario Motores"
                  description="Equivalencias Unity / Godot / Unreal."
                  icon={<Zap className="w-6 h-6" />}
                  accent="island-lime"
                />
              </Link>
              <div className="opacity-50 grayscale">
                <ModuleCard
                  title="Pato de Goma"
                  description="Chat de debug por auto-explicación."
                  icon={<Zap className="w-6 h-6" />}
                  accent="island-cyan"
                />
              </div>
            </div>
          </section>

          {/* Category: Soporte */}
          <section className="space-y-10">
            <h2 className="text-4xl font-heading text-white border-b-4 border-island-magenta w-fit pr-12 pb-2">
              FASE 4: PITCH
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/sos">
                <ModuleCard
                  title="S.O.S. Mentores"
                  description="Resume tu problema para el mentor."
                  icon={<LifeBuoy className="w-6 h-6" />}
                  accent="island-magenta"
                />
              </Link>
              <Link href="/logs">
                <ModuleCard
                  title="GDD Logs"
                  description="Historial de decisiones críticas."
                  icon={<BookOpen className="w-6 h-6" />}
                  accent="island-cyan"
                />
              </Link>
              <div className="opacity-50 grayscale">
                <ModuleCard
                  title="Guion del Pitch"
                  description="Estructura tu presentación final."
                  icon={<Zap className="w-6 h-6" />}
                  accent="island-lime"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ModuleCard({
  title,
  description,
  icon,
  accent,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: "island-lime" | "island-magenta" | "island-cyan";
}) {
  const accentClasses: Record<string, string> = {
    "island-lime": "text-island-lime",
    "island-magenta": "text-island-magenta",
    "island-cyan": "text-island-cyan",
  };

  const borderClasses: Record<string, string> = {
    "island-lime": "hover:border-island-lime/50",
    "island-magenta": "hover:border-island-magenta/50",
    "island-cyan": "hover:border-island-cyan/50",
  };

  const bgClasses: Record<string, string> = {
    "island-lime": "bg-island-lime/10",
    "island-magenta": "bg-island-magenta/10",
    "island-cyan": "bg-island-cyan/10",
  };

  const accentClass = accentClasses[accent];
  const accentBgClass = bgClasses[accent];
  const borderClass = borderClasses[accent];

  return (
    <div className={`group relative p-8 poster-card rounded-none ${borderClass} transition-all cursor-pointer overflow-hidden h-full transform hover:rotate-1 hover:scale-[1.02]`}>
      <div className={`absolute -top-6 -right-6 p-6 opacity-5 group-hover:opacity-30 transition-all ${accentClass} transform group-hover:scale-125`}>
        {icon}
      </div>
      <div className="relative z-10 space-y-6">
        <div className={`p-4 w-fit rounded-none ${accentBgClass} ${accentClass} shadow-[4px_4px_0px_currentColor]`}>
          {icon}
        </div>
        <h3 className="text-2xl font-heading text-white group-hover:neon-text-cyan transition-all tracking-tight leading-none">{title}</h3>
        <p className="text-base text-white/70 font-body leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}
