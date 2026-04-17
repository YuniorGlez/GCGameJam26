"use client";

import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Milestone {
  id: number;
  time: string;
  day: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
}

const milestones: Milestone[] = [
  {
    id: 1,
    day: "Viernes",
    time: "18:00",
    title: "Revelación del Tema",
    description: "Comienzo oficial de la Jam. Fase de lluvia de ideas.",
    status: "completed",
  },
  {
    id: 2,
    day: "Viernes",
    time: "22:00",
    title: "MVP Mecánico",
    description: "Cierre de puertas CDTIC. El núcleo del juego debe ser jugable.",
    status: "current",
  },
  {
    id: 3,
    day: "Sábado",
    time: "12:00",
    title: "Mentoría 1",
    description: "Sesión con profesionales. Prepara tus dudas técnicas.",
    status: "pending",
  },
  {
    id: 4,
    day: "Domingo",
    time: "13:00",
    title: "Feature Freeze",
    description: "No añadas más contenido. Pule bugs y prepara el build.",
    status: "pending",
  },
  {
    id: 5,
    day: "Domingo",
    time: "15:00",
    title: "Entrega Final",
    description: "Sube el build a Itch.io. Fin de la creación.",
    status: "pending",
  },
  {
    id: 6,
    day: "Domingo",
    time: "15:30",
    title: "Pitch de 2 min",
    description: "Presentación final ante el jurado y compañeros.",
    status: "pending",
  },
];

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-island-neon/70 hover:text-island-neon transition-colors font-body text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
      </Link>

      <section className="space-y-4">
        <h1 className="text-4xl font-heading text-white">Roadmap <span className="text-island-orange">50h</span></h1>
        <p className="text-foreground/60 font-body">
          Gestión del tiempo real basada en el horario oficial del CDTIC.
        </p>
      </section>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-island-neon before:via-island-orange before:to-island-dark">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
          >
            {/* Dot */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border border-island-dark bg-island-dark z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${
              milestone.status === "completed" ? "text-island-neon" : 
              milestone.status === "current" ? "text-island-orange neon-glow" : "text-white/20"
            }`}>
              {milestone.status === "completed" ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : milestone.status === "current" ? (
                <Clock className="w-6 h-6 animate-pulse" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>

            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[45%] p-6 bg-island-dark/60 border border-white/5 rounded-xl group-hover:border-island-neon/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <time className="font-heading text-xs text-island-neon">{milestone.day} {milestone.time}</time>
                <span className={`text-[10px] font-heading px-2 py-0.5 rounded border ${
                  milestone.status === "completed" ? "border-island-neon/50 text-island-neon" :
                  milestone.status === "current" ? "border-island-orange/50 text-island-orange" : "border-white/10 text-white/30"
                }`}>
                  {milestone.status.toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-heading text-white mb-1">{milestone.title}</h3>
              <p className="text-sm font-body text-foreground/60 leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
