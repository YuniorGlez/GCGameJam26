"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown = () => {
  const targetDate = new Date("2026-04-19T15:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return <div className="h-32 flex items-center justify-center font-body text-island-neon">Sincronizando con el CDTIC...</div>;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-island-dark/50 border border-island-neon/30 rounded-2xl neon-glow backdrop-blur-xl">
      <span className="text-xs font-heading text-island-neon uppercase tracking-widest">Tiempo para el Pitch Final</span>
      <div className="flex gap-4 md:gap-8">
        <TimeUnit value={timeLeft.days} label="Días" />
        <TimeUnit value={timeLeft.hours} label="Hrs" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center min-w-[60px]">
    <span className="text-4xl md:text-6xl font-heading text-white neon-text">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-[10px] md:text-xs font-body text-island-neon/70 uppercase">{label}</span>
  </div>
);
