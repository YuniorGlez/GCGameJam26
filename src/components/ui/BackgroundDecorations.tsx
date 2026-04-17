"use client";

import { motion } from "framer-motion";

export const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Gradients to mimic the poster's light flow */}
      <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-[#E52E8A]/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-[#00B5E2]/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 animate-pulse" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[40%] bg-[#FACC15]/5 blur-[100px] rounded-full" />

      {/* Pixel Squares - mimicking the poster's geometry */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="pixel-square"
          style={{
            width: Math.random() * 40 + 10,
            height: Math.random() * 40 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 3 === 0 ? "#E52E8A" : i % 3 === 1 ? "#00B5E2" : "#8DC63F",
            opacity: Math.random() * 0.2 + 0.05,
          }}
          animate={{
            y: [0, Math.random() * -50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Yellow highlight square - prominent in top right of poster */}
      <div className="absolute top-[10%] right-[25%] w-12 h-12 bg-[#FACC15] opacity-20 rotate-12 blur-[1px]" />
      <div className="absolute bottom-[30%] left-[15%] w-8 h-8 bg-[#8DC63F] opacity-15 -rotate-12 blur-[1px]" />
    </div>
  );
};
