"use client";
import { useState, FormEvent } from "react";
import { Dialog } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import toast from "react-hot-toast";
import { ICategory, LinkMetadata } from "@/lib/type";

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ICategory[];
  onSuccess?: () => void;
}

export default function AddLinkModal({
  isOpen,
  onClose,
  categories,
  onSuccess,
}: AddLinkModalProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    tags: "",
  });

  const fetchMetadata = async () => {
    if (!url) {
      toast.error("Vui lòng nhập URL");
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      toast.error("URL không hợp lệ");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data: LinkMetadata = await res.json();
      setMetadata(data);
      toast.success("Đã lấy thông tin website!");
    } catch (error) {
      toast.error("Không thể lấy thông tin website");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!metadata || !formData.category) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const submitToast = toast.loading("Đang gửi...");

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          title: metadata.title,
          description: metadata.description,
          image: metadata.image,
          favicon: metadata.favicon,
          category: formData.category,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to submit");
      }

      toast.success("Đã gửi link! Chờ admin duyệt.", { id: submitToast });

      // Reset form
      setUrl("");
      setMetadata(null);
      setFormData({ category: "", tags: "" });

      onSuccess?.();
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra", { id: submitToast });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              ✨ Thêm Link Mới
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HiX className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* URL Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔗 URL Website
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={fetchMetadata}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang tải...
                    </span>
                  ) : (
                    "Lấy thông tin"
                  )}
                </button>
              </div>
            </div>

            {/* Preview */}
            {metadata && (
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  👀 Preview
                </h4>
                {metadata.image && (
                  <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                    <img
                      src={metadata.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-start gap-3">
                  {metadata.favicon && (
                    <img
                      src={metadata.favicon}
                      alt=""
                      className="w-6 h-6 rounded flex-shrink-0"
                    />
                  )}
                  <div>
                    <h5 className="font-semibold text-gray-900">
                      {metadata.title}
                    </h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {metadata.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📂 Danh mục
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Chọn danh mục</option>
                {categories?.map((cat) => (
                  <option key={cat._id.toString()} value={cat._id.toString()}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🏷️ Tags (tùy chọn)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="design, tools, ai (cách nhau bởi dấu phẩy)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Nhập các tag cách nhau bởi dấu phẩy
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!metadata || !formData.category}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              🚀 Gửi Link
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
