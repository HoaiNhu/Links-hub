"use client";
import { useState, useEffect } from "react";
import LinkCard from "./LinkCard";
import { ILink, ICategory } from "@/lib/type";
import { HiSearch } from "react-icons/hi";
import { ApiClient } from "@/lib/api-client";
import LoadingSpinner from "./LoadingSpinner";

interface LinkListProps {
  initialLinks: (ILink & { category: ICategory })[];
  categories: ICategory[];
}

export default function LinkList({ initialLinks, categories }: LinkListProps) {
  const [links, setLinks] = useState(initialLinks);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch links khi filter thay đổi
  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status: "approved",
      });

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const data = await ApiClient.get<(ILink & { category: ICategory })[]>(
        `/api/links?${params}`
      );
      setLinks(data);
    } catch (error) {
      console.error("Failed to fetch links:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Search */}
        <div className="relative mb-4">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm website..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id.toString()}
              onClick={() => setSelectedCategory(cat._id.toString())}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat._id.toString()
                  ? "text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor:
                  selectedCategory === cat._id.toString()
                    ? cat.color
                    : undefined,
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && <LoadingSpinner className="py-12" />}

      {/* Links Grid */}
      {!loading && links.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <LinkCard key={link._id.toString()} link={link} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && links.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-700 text-lg font-medium">
            Không tìm thấy website nào
          </p>
        </div>
      )}
    </div>
  );
}
