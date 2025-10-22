"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  FaHome,
  FaThList,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import AddLinkModal from "./AddLinkModal";
import { ICategory } from "@/lib/type";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Categories", path: "/categories", icon: FaThList },
  ];

  const isAdmin = pathname?.startsWith("/admin");

  // Fetch categories for modal
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        console.log("Categories fetched:", data);
        // API trả về trực tiếp array, không có wrapper { data: [...] }
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle add link button click
  const handleAddLinkClick = () => {
    if (!session) {
      // Redirect to login if not logged in
      router.push("/auth/login");
      return;
    }
    // Open modal if logged in
    setIsAddLinkModalOpen(true);
  };

  if (isAdmin) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-light-500/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="neuro-card p-3">
                <span className="text-2xl font-bold text-neuro-dark">🔗</span>
              </div>
              <span className="text-2xl font-bold text-neuro-dark">
                LinksHub
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2">
            {tabs.map((tab) => {
              const isActive = pathname === tab.path;
              const Icon = tab.icon;

              return (
                <Link key={tab.path} href={tab.path}>
                  <motion.div
                    onHoverStart={() => setHoveredTab(tab.name)}
                    onHoverEnd={() => setHoveredTab(null)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-6 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "neuro-purple text-white"
                        : "neuro-button text-neuro-dark"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="text-lg" />
                      <span className="font-semibold">{tab.name}</span>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-white rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover effect */}
                    {hoveredTab === tab.name && !isActive && (
                      <motion.div
                        layoutId="hoverTab"
                        className="absolute -bottom-1 left-0 right-0 h-1 bg-secondary-500 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}

            {/* Add Link Button - for all users */}
            <motion.button
              onClick={handleAddLinkClick}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neuro-purple px-4 py-3 rounded-xl text-white flex items-center space-x-2"
              title="Thêm link mới"
            >
              <FaPlus className="text-lg" />
              <span className="font-semibold hidden lg:inline">Thêm Link</span>
            </motion.button>

            {/* Auth Buttons */}
            {session ? (
              <>
                {/* Admin Button - only for admin users */}
                {session.user?.role === "admin" && (
                  <Link href="/admin">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="neuro-button px-4 py-3 rounded-xl text-neuro-dark flex items-center space-x-2"
                      title="Admin Panel"
                    >
                      <FaUser className="text-lg" />
                    </motion.div>
                  </Link>
                )}

                {/* Logout Button */}
                <motion.button
                  onClick={() => signOut()}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="neuro-button px-4 py-3 rounded-xl text-neuro-dark flex items-center space-x-2"
                  title="Đăng xuất"
                >
                  <FaSignOutAlt className="text-lg" />
                </motion.button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link href="/auth/login">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="neuro-button px-4 py-3 rounded-xl text-neuro-dark flex items-center space-x-2"
                  >
                    <FaSignInAlt className="text-lg" />
                    <span className="font-semibold hidden lg:inline">
                      Đăng nhập
                    </span>
                  </motion.div>
                </Link>

                {/* Register Button */}
                <Link href="/auth/register">
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="neuro-purple px-4 py-3 rounded-xl text-white flex items-center space-x-2"
                  >
                    <FaUserPlus className="text-lg" />
                    <span className="font-semibold hidden lg:inline">
                      Đăng ký
                    </span>
                  </motion.div>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="md:hidden neuro-button p-3 rounded-xl text-neuro-dark"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-light-500/95 backdrop-blur-md border-t border-primary-200"
      >
        <div className="px-4 py-4 space-y-3">
          {/* Mobile Navigation Tabs */}
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.path}
                href={tab.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "neuro-purple text-white"
                      : "neuro-button text-neuro-dark"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-semibold">{tab.name}</span>
                </motion.div>
              </Link>
            );
          })}

          {/* Mobile Add Link Button */}
          <motion.button
            onClick={() => {
              handleAddLinkClick();
              setMobileMenuOpen(false);
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center space-x-3 px-4 py-3 neuro-purple text-white rounded-xl"
          >
            <FaPlus className="text-lg" />
            <span className="font-semibold">Thêm Link</span>
          </motion.button>

          {/* Mobile Auth Buttons */}
          {session ? (
            <>
              {/* Admin Button for mobile */}
              {session.user?.role === "admin" && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 px-4 py-3 neuro-button text-neuro-dark rounded-xl"
                  >
                    <FaUser className="text-lg" />
                    <span className="font-semibold">Admin Panel</span>
                  </motion.div>
                </Link>
              )}

              {/* Logout Button for mobile */}
              <motion.button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center space-x-3 px-4 py-3 neuro-button text-neuro-dark rounded-xl"
              >
                <FaSignOutAlt className="text-lg" />
                <span className="font-semibold">Đăng xuất</span>
              </motion.button>
            </>
          ) : (
            <>
              {/* Login Button for mobile */}
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 px-4 py-3 neuro-button text-neuro-dark rounded-xl"
                >
                  <FaSignInAlt className="text-lg" />
                  <span className="font-semibold">Đăng nhập</span>
                </motion.div>
              </Link>

              {/* Register Button for mobile */}
              <Link
                href="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 px-4 py-3 neuro-purple text-white rounded-xl"
                >
                  <FaUserPlus className="text-lg" />
                  <span className="font-semibold">Đăng ký</span>
                </motion.div>
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Add Link Modal */}
      <AddLinkModal
        isOpen={isAddLinkModalOpen}
        onClose={() => setIsAddLinkModalOpen(false)}
        categories={categories}
        onSuccess={() => {
          // Refresh page or show success message
          router.refresh();
        }}
      />
    </motion.nav>
  );
}
