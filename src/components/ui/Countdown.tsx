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

  if (!timeLeft) return <div className="h-32 flex items-center justify-center font-body text-island-cyan">Sincronizando con el CDTIC...</div>;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <span className="text-xs font-heading text-island-cyan uppercase tracking-widest neon-text-cyan flex items-center gap-2">
        <span className="w-2 h-2 bg-island-lime animate-pulse rounded-full" />
        Tiempo para el Pitch Final
      </span>
      <div className="flex gap-4 md:gap-8">
        <TimeUnit value={timeLeft.days} label="Días" color="text-island-magenta" />
        <div className="text-4xl md:text-6xl font-heading text-white/20 self-center">+</div>
        <TimeUnit value={timeLeft.hours} label="Hrs" color="text-island-cyan" />
        <div className="text-4xl md:text-6xl font-heading text-white/20 self-center">+</div>
        <TimeUnit value={timeLeft.minutes} label="Min" color="text-island-lime" />
        <div className="text-4xl md:text-6xl font-heading text-white/20 self-center">+</div>
        <TimeUnit value={timeLeft.seconds} label="Seg" color="text-white" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label, color }: { value: number; label: string; color: string }) => (
  <div className="flex flex-col items-center min-w-[60px]">
    <span className={`text-4xl md:text-7xl font-heading ${color} drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]`}>
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-[10px] md:text-xs font-body text-white/50 uppercase mt-2 tracking-tighter">{label}</span>
  </div>
);
