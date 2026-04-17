import { Countdown } from "@/components/ui/Countdown";
import { Zap, Map, LifeBuoy, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12 flex flex-col items-center min-h-screen">
      {/* Hero Section */}
      <section className="text-center mb-16 space-y-6 max-w-3xl">
        <div className="inline-block px-3 py-1 bg-island-blue/20 border border-island-blue/50 rounded-full text-island-neon text-xs font-heading mb-4">
          GRAN CANARIA GAME ISLAND JAM 2026
        </div>
        <h1 className="text-5xl md:text-7xl font-heading leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-island-neon">
          Island Jam <br /> <span className="text-island-orange text-shadow-glow">Copilot</span>
        </h1>
        <p className="text-foreground/70 font-body text-lg">
          IA Multimodal para equipos de alto rendimiento. Optimizado para el crunch de 50 horas.
        </p>
      </section>

      {/* Main UI */}
      <div className="w-full max-w-4xl space-y-12">
        <Countdown />

        {/* Quick Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/brainstorm">
            <ModuleCard
              title="Arranque Explosivo"
              description="Brainstorming de conceptos en < 10s alineados con el tema."
              icon={<Zap className="w-6 h-6" />}
              accent="island-neon"
            />
          </Link>
          <Link href="/roadmap">
            <ModuleCard
              title="Roadmap 50h"
              description="Calendario de hitos críticos y feature freeze."
              icon={<Map className="w-6 h-6" />}
              accent="island-orange"
            />
          </Link>
          <Link href="/sos">
            <ModuleCard
              title="S.O.S. Mentores"
              description="Prepara un resumen del problema para los mentores."
              icon={<LifeBuoy className="w-6 h-6" />}
              accent="island-blue"
            />
          </Link>
          <Link href="/logs">
            <ModuleCard
              title="GDD Logs"
              description="Historial de decisiones y mecánicas descartadas."
              icon={<BookOpen className="w-6 h-6" />}
              accent="island-neon"
            />
          </Link>
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
  accent: "island-neon" | "island-orange" | "island-blue";
}) {
  const accentClasses: Record<string, string> = {
    "island-neon": "text-island-neon",
    "island-orange": "text-island-orange",
    "island-blue": "text-island-blue",
  };

  const bgClasses: Record<string, string> = {
    "island-neon": "bg-island-neon/10",
    "island-orange": "bg-island-orange/10",
    "island-blue": "bg-island-blue/10",
  };

  const accentClass = accentClasses[accent];
  const accentBgClass = bgClasses[accent];

  return (
    <div className="group relative p-6 bg-island-dark/40 border border-white/10 rounded-xl hover:border-island-neon/50 transition-all cursor-pointer overflow-hidden h-full">
      <div className={`absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-20 transition-all ${accentClass} transform group-hover:scale-110`}>
        {icon}
      </div>
      <div className="relative z-10 space-y-3">
        <div className={`p-3 w-fit rounded-lg ${accentBgClass} ${accentClass}`}>
          {icon}
        </div>
        <h3 className="text-xl font-heading text-white">{title}</h3>
        <p className="text-sm text-foreground/60 font-body leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
