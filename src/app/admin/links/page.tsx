"use client";
import { useEffect, useState, useCallback } from "react";
import {
  HiTrash,
  HiExternalLink,
  HiChevronUp,
  HiChevronDown,
} from "react-icons/hi";
import Image from "next/image";
import toast from "react-hot-toast";
import { ILink, ICategory } from "@/lib/type";

type SortField =
  | "title"
  | "category"
  | "status"
  | "views"
  | "clicks"
  | "createdAt";
type SortOrder = "asc" | "desc";

export default function AdminLinksPage() {
  const [links, setLinks] = useState<(ILink & { category: ICategory })[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      const status = filter === "all" ? "approved" : filter;
      let url = `/api/links?status=${status}`;

      if (categoryFilter !== "all") {
        url += `&category=${categoryFilter}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      toast.error("Không thể tải danh sách");
      console.error("Failed to fetch links:", err);
    } finally {
      setLoading(false);
    }
  }, [filter, categoryFilter]);

  useEffect(() => {
    fetchCategories();
    fetchLinks();
  }, [fetchCategories, fetchLinks]);

  // Sorting function
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle order if same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Get sorted links
  const getSortedLinks = () => {
    const sorted = [...links].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "category":
          aValue = a.category?.name.toLowerCase() || "";
          bValue = b.category?.name.toLowerCase() || "";
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "views":
          aValue = a.views || 0;
          bValue = b.views || 0;
          break;
        case "clicks":
          aValue = a.clicks || 0;
          bValue = b.clicks || 0;
          break;
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const sortedLinks = getSortedLinks();

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa link này?")) return;

    const deleteToast = toast.loading("Đang xóa...");
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Đã xóa!", { id: deleteToast });
        fetchLinks();
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra", { id: deleteToast });
      console.error("Failed to delete link:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Links</h1>
          <p className="mt-1">{sortedLinks.length} links</p>
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          {/* Status Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="approved">Đã duyệt</option>
            <option value="pending">Chờ duyệt</option>
            <option value="rejected">Đã từ chối</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat._id.toString()} value={cat._id.toString()}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center gap-2">
                    Website
                    {sortField === "title" &&
                      (sortOrder === "asc" ? (
                        <HiChevronUp className="w-4 h-4" />
                      ) : (
                        <HiChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center gap-2">
                    Danh mục
                    {sortField === "category" &&
                      (sortOrder === "asc" ? (
                        <HiChevronUp className="w-4 h-4" />
                      ) : (
                        <HiChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-2">
                    Trạng thái
                    {sortField === "status" &&
                      (sortOrder === "asc" ? (
                        <HiChevronUp className="w-4 h-4" />
                      ) : (
                        <HiChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("views")}
                >
                  <div className="flex items-center gap-2">
                    Lượt xem
                    {sortField === "views" &&
                      (sortOrder === "asc" ? (
                        <HiChevronUp className="w-4 h-4" />
                      ) : (
                        <HiChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort("clicks")}
                >
                  <div className="flex items-center gap-2">
                    Clicks
                    {sortField === "clicks" &&
                      (sortOrder === "asc" ? (
                        <HiChevronUp className="w-4 h-4" />
                      ) : (
                        <HiChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLinks.map((link, index) => (
                <tr key={link._id.toString()} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {link.favicon && (
                        <Image
                          src={link.favicon}
                          alt={link.title}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                      )}
                      <div className="max-w-xs">
                        <p className="font-medium text-gray-900 truncate">
                          {link.title}
                        </p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {link.url.substring(0, 40)}...
                          <HiExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: link.category?.color + "20",
                        color: link.category?.color,
                      }}
                    >
                      {link.category?.icon} {link.category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        link.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : link.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {link.status === "approved" && "✓ Đã duyệt"}
                      {link.status === "pending" && "⏳ Chờ duyệt"}
                      {link.status === "rejected" && "✗ Từ chối"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {link.views || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {link.clicks || 0}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(link._id.toString())}
                      className="text-red-600 hover:text-red-900 ml-3"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {sortedLinks.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">Không có link nào</p>
        </div>
      )}

      {/* Sort Info */}
      <div className="text-sm text-gray-500 text-center">
        Sắp xếp theo: <span className="font-medium">{sortField}</span> (
        {sortOrder === "asc" ? "A → Z" : "Z → A"})
      </div>
    </div>
  );
}
