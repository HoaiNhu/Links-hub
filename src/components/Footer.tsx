"use client";

import { motion } from "framer-motion";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/HoaiNhu", label: "GitHub" },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/nhu-nguyen-37a828177/",
      label: "LinkedIn",
    },
    { icon: FaEnvelope, href: "mailto:nhoainhu733@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative mt-20 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-primary-500/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="neuro-card p-3 rounded-xl">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-2xl font-bold text-primary-500">LinksHub</h3>
            </div>
            <p className="text-primary-600 leading-relaxed">
              Nền tảng tổng hợp những website hữu ích nhất cho cộng đồng
              developers và designers Việt Nam.
            </p>
          </motion.div>

          {/* Quick Links
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-primary-500 mb-4">
              Liên kết nhanh
            </h4>
            <ul className="space-y-2">
              {["Home", "Categories", "About", "Contact"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="text-primary-600 hover:text-secondary-500 transition-colors inline-block"
                  >
                    <motion.span whileHover={{ x: 5 }} className="inline-block">
                      → {item}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div> */}

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-primary-500 mb-4">
              Kết nối với chúng tôi
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 * index,
                      type: "spring",
                    }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="neuro-card p-4 rounded-xl text-primary-500 hover:text-secondary-500 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="text-2xl" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent mb-8"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-primary-600 flex items-center justify-center space-x-2">
            <span>© 2025 LinksHub. Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="text-red-500" />
            </motion.span>
            <span>by LinksHub Team</span>
          </p>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-20 h-20 border-4 border-secondary-500/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 left-10 w-16 h-16 border-4 border-primary-500/20 rounded-full"
      />
    </footer>
  );
}
