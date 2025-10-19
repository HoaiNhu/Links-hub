"use client";
import { useEffect, useState } from "react";
import { HiCheck, HiX, HiExternalLink } from "react-icons/hi";
import toast from "react-hot-toast";
import { ILink, ICategory, IUser } from "@/lib/type";

interface PopulatedLink extends Omit<ILink, "category" | "submittedBy"> {
  category: ICategory;
  submittedBy: Pick<IUser, "_id" | "name" | "email">;
}

export default function PendingLinksPage() {
  const [links, setLinks] = useState<PopulatedLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingLinks();
  }, []);

  const fetchPendingLinks = async () => {
    try {
      const res = await fetch("/api/links?status=pending");
      const data = await res.json();
      setLinks(data);
    } catch (error) {
      toast.error("Không thể tải danh sách");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (linkId: string) => {
    const approveToast = toast.loading("Đang duyệt...");
    try {
      const res = await fetch(`/api/links/${linkId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "approved",
          approvedAt: new Date(),
        }),
      });

      if (res.ok) {
        toast.success("Đã duyệt link!", { id: approveToast });
        fetchPendingLinks();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra", { id: approveToast });
    }
  };

  const handleReject = async (linkId: string) => {
    if (!confirm("Bạn có chắc muốn từ chối link này?")) return;

    const rejectToast = toast.loading("Đang xử lý...");
    try {
      const res = await fetch(`/api/links/${linkId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });

      if (res.ok) {
        toast.success("Đã từ chối link!", { id: rejectToast });
        fetchPendingLinks();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra", { id: rejectToast });
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Links chờ duyệt</h1>
        <p className="text-gray-600 mt-1">{links.length} link đang chờ duyệt</p>
      </div>

      {/* Links List */}
      {links.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">Không có link nào chờ duyệt</p>
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => (
            <div
              key={link._id.toString()}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-start gap-6">
                {/* Thumbnail */}
                {link.image && (
                  <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={link.image}
                      alt={link.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {link.favicon && (
                          <img
                            src={link.favicon}
                            alt=""
                            className="w-5 h-5 rounded"
                          />
                        )}
                        <h3 className="font-semibold text-lg text-gray-900">
                          {link.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {link.description}
                      </p>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                      >
                        {link.url}
                        <HiExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(link._id.toString())}
                        className="p-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
                        title="Duyệt"
                      >
                        <HiCheck className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleReject(link._id.toString())}
                        className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                        title="Từ chối"
                      >
                        <HiX className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: link.category?.color + "20",
                        color: link.category?.color,
                      }}
                    >
                      {link.category?.icon} {link.category?.name}
                    </span>
                    <span>
                      Gửi bởi:{" "}
                      <strong>{link.submittedBy?.name || "Unknown"}</strong>
                    </span>
                    <span>
                      {new Date(link.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
