"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Logo Animation */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="neuro-card p-8 rounded-3xl inline-block mb-6"
        >
          <span className="text-6xl">🔗</span>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          animate={{
            color: ["#03045e", "#6f2dbd", "#03045e"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-3xl font-bold mb-4"
        >
          LinksHub
        </motion.h2>

        {/* Loading Dots */}
        <div className="flex items-center justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-secondary-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
