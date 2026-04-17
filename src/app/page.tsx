import { Countdown } from "@/components/ui/Countdown";
import { Zap, Map, LifeBuoy, BookOpen, Clock, Sparkles, PlusCircle, Scale } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative island-gradient min-h-screen overflow-hidden">
      {/* Decorative "Pixels" from branding */}
      <div className="absolute top-20 left-[10%] w-4 h-4 bg-island-cyan animate-pulse shadow-[0_0_15px_rgba(0,181,226,0.8)] rotate-45" />
      <div className="absolute top-40 right-[15%] w-3 h-3 bg-island-lime animate-bounce shadow-[0_0_10px_rgba(141,198,63,0.8)]" />
      <div className="absolute bottom-20 left-[20%] w-5 h-5 bg-island-magenta opacity-50 shadow-[0_0_20px_rgba(229,46,138,0.8)] -rotate-12" />
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center relative z-10">
        {/* Hero Section */}
        <section className="text-center mb-16 space-y-6 max-w-3xl">
          <div className="inline-block px-4 py-1.5 bg-island-cyan/10 border border-island-cyan/30 rounded-full text-island-cyan text-xs font-heading mb-4 neon-glow-cyan tracking-widest">
            GRAN CANARIA GAME ISLAND JAM 2026
          </div>
          <h1 className="text-5xl md:text-8xl font-heading leading-tight bg-clip-text text-transparent bg-gradient-to-r from-island-cyan via-white to-island-magenta drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Island Jam <br /> <span className="text-island-lime neon-text-lime italic">Copilot</span>
          </h1>
          <p className="text-foreground/80 font-body text-lg max-w-xl mx-auto border-l-2 border-island-magenta pl-4 py-2 bg-island-magenta/5">
            IA Multimodal para equipos de alto rendimiento. <br/>
            <span className="text-island-cyan">Optimizado para el crunch de 48 horas.</span>
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
            </div>
          </section>

          {/* Category: Gestión */}
          <section className="space-y-6">
            <h2 className="text-2xl font-heading text-island-lime flex items-center gap-3">
              <Map className="w-6 h-6" /> Fase 2: Alcance y Realidad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/roadmap">
                <ModuleCard
                  title="Roadmap 48h"
                  description="Cronograma crítico y feature freeze."
                  icon={<Clock className="w-6 h-6" />}
                  accent="island-lime"
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
            </div>
          </section>

          {/* Category: Soporte */}
          <section className="space-y-6">
            <h2 className="text-2xl font-heading text-island-magenta flex items-center gap-3">
              <LifeBuoy className="w-6 h-6" /> Fase 3: Soporte y Pitch
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
