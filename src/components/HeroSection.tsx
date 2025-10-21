"use client";

import { motion } from "framer-motion";
import { FaArrowDown, FaRocket } from "react-icons/fa";

interface HeroSectionProps {
  userName?: string;
}

export default function HeroSection({ userName }: HeroSectionProps) {
  const scrollToStats = () => {
    document
      .getElementById("stats-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-10 left-10 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl text-primary-500 font-medium mb-4"
          >
            👋 Xin chào{userName ? `, ${userName}` : ""}!
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-primary-500 mb-6"
          >
            Chào mừng đến với
            <motion.span
              animate={{ color: ["#03045e", "#6f2dbd", "#03045e"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="block mt-2"
            >
              LinksHub
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-lg md:text-xl text-primary-600 max-w-3xl mx-auto mb-12"
          >
            Nơi tổng hợp những website hữu ích nhất cho developers, designers và
            tất cả những ai đam mê công nghệ
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              onClick={scrollToStats}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="neuro-purple px-8 py-4 rounded-2xl text-white font-semibold text-lg flex items-center space-x-3 group"
            >
              <FaRocket className="text-xl group-hover:animate-bounce" />
              <span>Khám phá ngay</span>
            </motion.button>

            <motion.a
              href="/categories"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="neuro-button px-8 py-4 rounded-2xl text-primary-500 font-semibold text-lg"
            >
              Xem Categories
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={scrollToStats}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="neuro-card p-4 rounded-full text-secondary-500 hover:text-secondary-600 transition-colors"
            >
              <FaArrowDown className="text-2xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/4 left-10 neuro-card p-4 rounded-2xl"
      >
        <span className="text-3xl">💡</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        className="absolute top-1/3 right-10 neuro-card p-4 rounded-2xl"
      >
        <span className="text-3xl">🚀</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 left-20 neuro-card p-4 rounded-2xl"
      >
        <span className="text-3xl">⭐</span>
      </motion.div>
    </section>
  );
}
