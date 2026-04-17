import { Countdown } from "@/components/ui/Countdown";
import { Zap, Map, LifeBuoy, BookOpen, Clock, Sparkles, PlusCircle, Scale, Scissors, Hammer, AlertTriangle, ShoppingCart, Code } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-8 max-w-4xl">
          <div className="inline-block px-4 py-1.5 bg-island-cyan/10 border border-island-cyan/30 rounded-full text-island-cyan text-xs font-heading mb-4 neon-glow-cyan tracking-widest animate-pulse">
            GRAN CANARIA GAME ISLAND JAM 2026
          </div>
          
          <div className="relative">
            <h1 className="text-6xl md:text-9xl font-heading leading-none neon-pipe-text tracking-tighter">
              ISLAND JAM<br />
              <span className="text-island-lime italic block mt-2 drop-shadow-lg">COPILOT</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl font-body text-white/80 max-w-2xl mx-auto border-y border-white/10 py-6 px-4 bg-white/5 backdrop-blur-sm">
            ¿Eres capaz de crear un videojuego en <span className="text-island-magenta font-bold underline decoration-island-magenta/50">48 horas</span>? <br/>
            <span className="text-island-cyan text-base md:text-lg mt-2 block opacity-70 italic tracking-wide">IA Multimodal para equipos de alto rendimiento.</span>
          </p>
        </section>

        {/* Main UI */}
        <div className="w-full max-w-5xl space-y-16">
          <div className="glass-panel p-8 rounded-2xl neon-glow-cyan">
            <Countdown />
          </div>

          {/* Category: Ideación */}
          <section className="space-y-6">
            <h2 className="text-2xl font-heading text-island-cyan flex items-center gap-3">
              <Zap className="w-6 h-6" /> Fase 1: Ideación e Impulso
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  description="Crea conceptos híbridos rompedores para tu prototipo."
                  icon={<Zap className="w-6 h-6" />}
                  accent="island-lime"
                />
              </Link>
              <Link href="/generador-limbo">
                <ModuleCard
                  title="Generador de Limbo"
                  description="Resuelve dudas entre ideas y encuentra el punto medio."
                  icon={<Scale className="w-6 h-6" />}
                  accent="island-cyan"
                />
              </Link>
              <Link href="/inspiracion-restriccion">
                <ModuleCard
                  title="Inspiración x Restricción"
                  description="Desbloquea tu creatividad forzando límites de diseño."
                  icon={<Zap className="w-6 h-6" />}
                  accent="island-magenta"
                />
              </Link>
            </div>
          </section>

          {/* Category: Gestión */}
          <section className="space-y-6">
            <h2 className="text-2xl font-heading text-island-lime flex items-center gap-3">
              <Map className="w-6 h-6" /> Fase 2: Alcance y Realidad
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  description="Las 3 mecánicas sagradas. Tu núcleo innegociable."
                  icon={<Hammer className="w-6 h-6" />}
                  accent="island-magenta"
                />
              </Link>
              <Link href="/giro-inesperado">
                <ModuleCard
                  title="El Giro Inesperado"
                  description="Añade una regla disruptiva para destacar."
                  icon={<Zap className="w-6 h-6" />}
                  accent="island-magenta"
                />
              </Link>
              <Link href="/tijeretazo-maestro">
                <ModuleCard
                  title="Tijeretazo Maestro"
                  description="Qué eliminar cuando no hay tiempo. Prioridad absoluta."
                  icon={<Scissors className="w-6 h-6" />}
                  accent="island-cyan"
                />
              </Link>
              <Link href="/medidor-marrones">
                <ModuleCard
                  title="Medidor de Marrones"
                  description="Dificultad técnica vs tiempo. ¿Es factible tu idea?"
                  icon={<AlertTriangle className="w-6 h-6" />}
                  accent="island-lime"
                />
              </Link>
              <Link href="/lista-compra-assets">
                <ModuleCard
                  title="Lista de la Compra"
                  description="Assets de arte y sonido esenciales para tu MVP."
                  icon={<ShoppingCart className="w-6 h-6" />}
                  accent="island-cyan"
                />
              </Link>
            </div>
          </section>

          {/* Category: Técnico */}
          <section className="space-y-6">
            <h2 className="text-2xl font-heading text-island-cyan flex items-center gap-3">
              <Code className="w-6 h-6" /> Fase 3: Desarrollo y Atascos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/traductor-logica">
                <ModuleCard
                  title="Traductor a Lógica"
                  description="De lenguaje humano a pseudocódigo estructurado."
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
          <section className="space-y-6">
            <h2 className="text-2xl font-heading text-island-magenta flex items-center gap-3">
              <LifeBuoy className="w-6 h-6" /> Fase 4: Soporte y Pitch
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
                  description="Próximamente..."
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
    <div className={`group relative p-6 glass-panel rounded-xl ${borderClass} transition-all cursor-pointer overflow-hidden h-full`}>
      <div className={`absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-20 transition-all ${accentClass} transform group-hover:scale-110`}>
        {icon}
      </div>
      <div className="relative z-10 space-y-4">
        <div className={`p-3 w-fit rounded-lg ${accentBgClass} ${accentClass} neon-glow-${accent.replace('island-', '')}`}>
          {icon}
        </div>
        <h3 className="text-xl font-heading text-white group-hover:neon-text-cyan transition-all">{title}</h3>
        <p className="text-sm text-foreground/70 font-body leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
