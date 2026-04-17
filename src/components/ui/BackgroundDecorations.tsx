"use client";

import { motion } from "framer-motion";

export const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {/* Background Gradients - remain in back */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-[80%] h-[80%] bg-[#E52E8A]/20 blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[90%] h-[90%] bg-[#00B5E2]/30 blur-[150px] translate-x-1/4 translate-y-1/4" />
      </div>

      {/* Falling Pixel Squares with "Gravity" */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="pixel-square"
          style={{
            width: Math.random() * 30 + 5,
            height: Math.random() * 30 + 5,
            left: `${Math.random() * 100}%`,
            top: `-10%`, // Start above screen
            backgroundColor: i % 4 === 0 ? "#E52E8A" : i % 4 === 1 ? "#00B5E2" : i % 4 === 2 ? "#8DC63F" : "#FACC15",
            opacity: Math.random() * 0.1 + 0.05, // Very subtle since it's on top
            borderRadius: i % 8 === 0 ? "50%" : "1px",
          }}
          animate={{
            y: ["0vh", "110vh"], // Fall all the way down
            x: [0, Math.random() * 40 - 20, 0], // Slight horizontal sway
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 15 + 15, // Slow fall (15-30 seconds)
            repeat: Infinity,
            delay: Math.random() * 20, // Staggered start
            ease: "linear",
          }}
        />
      ))}

      {/* Static but overlayed prominent elements */}
      <div className="absolute top-[15%] right-[22%] w-16 h-16 bg-[#FACC15] opacity-10 rotate-12 blur-[1px]" />
      <div className="absolute bottom-[25%] left-[28%] w-12 h-12 bg-[#8DC63F] opacity-10 -rotate-12 blur-[1px]" />
    </div>
  );
};
