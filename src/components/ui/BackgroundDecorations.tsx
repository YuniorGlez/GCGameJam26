"use client";

import { motion } from "framer-motion";

export const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Gradients to mimic the poster's light flow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-0 left-0 w-[80%] h-[80%] bg-[#E52E8A]/20 blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#FACC15]/20 blur-[150px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[90%] h-[90%] bg-[#00B5E2]/30 blur-[150px] translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Vertical and slanted "light rays" from the poster */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-[30%] w-[1px] h-full bg-white/50 rotate-[15deg]" />
        <div className="absolute top-0 left-[60%] w-[2px] h-full bg-island-cyan/50 -rotate-[5deg]" />
        <div className="absolute bottom-0 right-[20%] w-[1px] h-full bg-island-magenta/50 rotate-[25deg]" />
      </div>

      {/* Pixel Squares - mimicking the poster's geometry */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="pixel-square"
          style={{
            width: Math.random() * 60 + 10,
            height: Math.random() * 60 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 4 === 0 ? "#E52E8A" : i % 4 === 1 ? "#00B5E2" : i % 4 === 2 ? "#8DC63F" : "#FACC15",
            opacity: Math.random() * 0.4 + 0.1,
            borderRadius: i % 5 === 0 ? "50%" : "2px",
          }}
          animate={{
            y: [0, Math.random() * -30, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Prominent squares from the poster */}
      <div className="absolute top-[15%] right-[22%] w-16 h-16 bg-[#FACC15] opacity-40 rotate-12" />
      <div className="absolute bottom-[25%] left-[28%] w-12 h-12 bg-[#8DC63F] opacity-30 -rotate-12" />
      <div className="absolute top-[45%] left-[5%] w-10 h-10 bg-[#E52E8A] opacity-25 rotate-45" />
    </div>
  );
};
