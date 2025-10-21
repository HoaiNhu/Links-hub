"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaPlus, FaChevronDown, FaFilter } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LinkCard from "./LinkCard";
import AddLinkModal from "./AddLinkModal";
import { ICategory, ILink } from "@/lib/type";

interface Link {
  _id: string;
  title: string;
  url: string;
  description?: string;
  views?: number;
  clicks?: number;
  imageUrl?: string;
  tags?: string[];
}

interface CategoryWithLinks {
  _id: string;
  name: string;
  description?: string;
  icon?: string;
  links: Link[];
}

interface CategoriesContentProps {
  categories: CategoryWithLinks[];
}

export default function CategoriesContent({
  categories,
}: CategoriesContentProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "count">("name");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<ICategory[]>([]);

  // Filter and sort categories
  const filteredCategories = useMemo(() => {
    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => b.links.length - a.links.length);
    }

    return filtered;
  }, [categories, searchTerm, sortBy]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  // Fetch all categories for modal
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setAllCategories(data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle add link button click
  const handleAddLinkClick = () => {
    if (!session) {
      router.push("/auth/login");
      return;
    }
    setIsAddLinkModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-primary-500 mb-4">
            📚 Categories
          </h1>
          <p className="text-xl text-primary-600 max-w-2xl mx-auto">
            Khám phá thế giới websites được sắp xếp theo danh mục
          </p>
        </motion.div>
      </section>

      {/* Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="neuro-card p-6 rounded-3xl"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500" />
                <input
                  type="text"
                  placeholder="Tìm kiếm category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="neuro-input w-full pl-12 pr-4 py-3 text-primary-500 placeholder:text-primary-400"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-primary-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "count")}
                className="neuro-input px-4 py-3 text-primary-500 cursor-pointer"
              >
                <option value="name">Sắp xếp A-Z</option>
                <option value="count">Số lượng link</option>
              </select>
            </div>

            {/* Add Link Button */}
            <motion.button
              onClick={handleAddLinkClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neuro-purple px-6 py-3 rounded-xl text-white font-semibold flex items-center space-x-2 justify-center"
            >
              <FaPlus />
              <span>Thêm Link</span>
            </motion.button>
          </div>

          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-primary-600 text-sm mt-4"
          >
            Tìm thấy {filteredCategories.length} categories với{" "}
            {filteredCategories.reduce((sum, cat) => sum + cat.links.length, 0)}{" "}
            links
          </motion.p>
        </motion.div>
      </section>

      {/* Categories List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-6">
          {filteredCategories.map((category, index) => (
            <CategoryItem
              key={category._id}
              category={category}
              index={index}
              isExpanded={expandedCategory === category._id}
              onToggle={() => toggleCategory(category._id)}
            />
          ))}

          {filteredCategories.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-primary-500 font-semibold mb-2">
                🔍 Không tìm thấy category
              </p>
              <p className="text-primary-600">Thử tìm kiếm với từ khóa khác</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Add Link Modal */}
      <AddLinkModal
        isOpen={isAddLinkModalOpen}
        onClose={() => setIsAddLinkModalOpen(false)}
        categories={allCategories}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </div>
  );
}

function CategoryItem({
  category,
  index,
  isExpanded,
  onToggle,
}: {
  category: CategoryWithLinks;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="neuro-card rounded-3xl overflow-hidden"
    >
      {/* Category Header */}
      <motion.button
        onClick={onToggle}
        whileHover={{ backgroundColor: "rgba(111, 45, 189, 0.05)" }}
        className="w-full p-6 flex items-center justify-between cursor-pointer transition-colors"
      >
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="neuro-button p-4 rounded-2xl"
          >
            <span className="text-3xl">{category.icon || "📁"}</span>
          </motion.div>

          {/* Info */}
          <div className="text-left">
            <h3 className="text-2xl font-bold text-primary-500 mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-primary-600">
              {category.links.length} links
            </p>
          </div>
        </div>

        {/* Expand Arrow */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="neuro-button p-3 rounded-xl"
        >
          <FaChevronDown className="text-primary-500 text-xl" />
        </motion.div>
      </motion.button>

      {/* Links List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 space-y-4">
              {/* Description */}
              {category.description && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-primary-600 mb-4 pb-4 border-b border-primary-200"
                >
                  {category.description}
                </motion.p>
              )}

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.links.map((link, linkIndex) => (
                  <motion.div
                    key={link._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: linkIndex * 0.05 }}
                    className="h-full"
                  >
                    <LinkCard
                      link={
                        {
                          ...link,
                          category: { name: category.name, _id: category._id },
                        } as unknown as ILink & { category: ICategory }
                      }
                    />
                  </motion.div>
                ))}
              </div>

              {category.links.length === 0 && (
                <p className="text-center text-primary-600 py-8">
                  Chưa có link nào trong category này
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
