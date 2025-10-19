"use client";
import { useEffect, useState } from "react";
import { HiPencil, HiTrash, HiExternalLink } from "react-icons/hi";
import toast from "react-hot-toast";
import { ILink, ICategory } from "@/lib/type";

export default function AdminLinksPage() {
  const [links, setLinks] = useState<(ILink & { category: ICategory })[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchLinks();
  }, [filter]);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const status = filter === "all" ? "approved" : filter;
      const res = await fetch(`/api/links?status=${status}`);
      const data = await res.json();
      setLinks(data);
    } catch (error) {
      toast.error("Không thể tải danh sách");
    } finally {
      setLoading(false);
    }
  };

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
    } catch (error) {
      toast.error("Có lỗi xảy ra", { id: deleteToast });
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
          <p className="text-gray-600 mt-1">{links.length} links</p>
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">Tất cả</option>
          <option value="approved">Đã duyệt</option>
          <option value="pending">Chờ duyệt</option>
          <option value="rejected">Đã từ chối</option>
        </select>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lượt xem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {links.map((link) => (
                <tr key={link._id.toString()} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {link.favicon && (
                        <img
                          src={link.favicon}
                          alt=""
                          className="w-6 h-6 rounded"
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
      {links.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">Không có link nào</p>
        </div>
      )}
    </div>
  );
}
