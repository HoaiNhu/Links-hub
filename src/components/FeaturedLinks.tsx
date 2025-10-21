"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaFire } from "react-icons/fa";
import LinkCard from "./LinkCard";
import { ILink, ICategory } from "@/lib/type";

interface FeaturedLink {
  _id: string;
  title: string;
  url: string;
  description?: string;
  category?: {
    name: string;
    _id: string;
  };
  views?: number;
  clicks?: number;
  imageUrl?: string;
  tags?: string[];
}

interface FeaturedLinksProps {
  links: FeaturedLink[];
}

export default function FeaturedLinks({ links }: FeaturedLinksProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Get top 6 most viewed/clicked links
  const featuredLinks = links
    .sort(
      (a, b) =>
        (b.views || 0) + (b.clicks || 0) - ((a.views || 0) + (a.clicks || 0))
    )
    .slice(0, 6);

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-light-500/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaFire className="text-4xl text-secondary-500" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-500">
              Links nổi bật
            </h2>
            <FaFire className="text-4xl text-secondary-500" />
          </div>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Những website được cộng đồng yêu thích và truy cập nhiều nhất
          </p>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredLinks.map((link, index) => (
            <motion.div
              key={link._id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
              }}
              className="h-full"
            >
              <LinkCard
                link={link as unknown as ILink & { category: ICategory }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
