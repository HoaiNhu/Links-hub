"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLink, FaThList, FaUsers, FaEye } from "react-icons/fa";

interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  color: string;
}

interface StatsCounterProps {
  totalLinks: number;
  totalCategories: number;
  totalUsers?: number;
  totalViews?: number;
}

export default function StatsCounter({
  totalLinks,
  totalCategories,
  totalUsers = 0,
  totalViews = 0,
}: StatsCounterProps) {
  const stats: StatItem[] = [
    {
      icon: FaLink,
      value: totalLinks,
      label: "Websites",
      color: "text-primary-500",
    },
    {
      icon: FaThList,
      value: totalCategories,
      label: "Categories",
      color: "text-secondary-500",
    },
    {
      icon: FaUsers,
      value: totalUsers,
      label: "Users",
      color: "text-primary-600",
    },
    {
      icon: FaEye,
      value: totalViews,
      label: "Total Views",
      color: "text-secondary-600",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="stats-section"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-500 mb-4">
            Thống kê
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Con số ấn tượng về cộng đồng LinksHub của chúng tôi
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: StatItem;
  index: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="neuro-card p-8 rounded-3xl text-center group cursor-pointer"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ duration: 0.6 }}
        className={`inline-flex items-center justify-center w-20 h-20 rounded-full neuro-button mb-6 ${stat.color}`}
      >
        <Icon className="text-3xl" />
      </motion.div>

      {/* Count */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.1 + 0.2,
          type: "spring",
        }}
      >
        <p className="text-5xl font-bold text-primary-500 mb-2 group-hover:text-secondary-500 transition-colors">
          {count.toLocaleString()}
        </p>
      </motion.div>

      {/* Label */}
      <p className="text-lg font-semibold text-primary-600">{stat.label}</p>

      {/* Decorative element */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: "50%" } : {}}
        transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
        className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mt-4"
      />
    </motion.div>
  );
}
