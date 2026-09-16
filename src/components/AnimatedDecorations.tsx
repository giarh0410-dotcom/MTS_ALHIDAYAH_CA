import React from "react";
import { motion } from "motion/react";

export const AnimatedDotGrid: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`pointer-events-none inline-block ${className}`}>
      <motion.div
        animate={{
          x: [0, 8, 0],
          y: [0, -8, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="grid grid-cols-5 gap-1.5 p-2 bg-emerald-50/80 backdrop-blur-xs rounded-xl border border-emerald-200/60 shadow-xs"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
        ))}
      </motion.div>
    </div>
  );
};

export const AnimatedArrow: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, 8, -8, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`pointer-events-none select-none inline-block ${className}`}
    >
      <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-emerald-100">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 drop-shadow-xs"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          viewBox="0 0 100 100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 35 C 45 5, 85 30, 65 70 C 50 95, 20 85, 45 60 L 32 68 M 45 60 L 58 63"
          />
        </svg>
      </div>
    </motion.div>
  );
};
