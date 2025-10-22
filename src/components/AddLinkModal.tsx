"use client";
import { useState, FormEvent } from "react";
import { Dialog } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import { ICategory, LinkMetadata } from "@/lib/type";
import { ApiClient } from "@/lib/api-client";
import { showToast } from "@/lib/toast-utils";

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
      showToast.error("Vui lòng nhập URL");
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      showToast.error("URL không hợp lệ");
      return;
    }

    setLoading(true);
    try {
      const data = await ApiClient.post<LinkMetadata>("/api/metadata", { url });
      setMetadata(data);
      showToast.success("Đã lấy thông tin website!");
    } catch (error) {
      showToast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!metadata || !formData.category) {
      showToast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const submitToast = showToast.loading("Đang gửi...");

    try {
      await ApiClient.post("/api/links", {
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
      });

      showToast.success("Đã gửi link! Chờ admin duyệt.", submitToast);

      // Reset form
      setUrl("");
      setMetadata(null);
      setFormData({ category: "", tags: "" });

      onSuccess?.();
      onClose();
    } catch (error) {
      showToast.error(error, submitToast);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="neuro-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-light-500">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-primary-200 sticky top-0 bg-light-500 z-10 rounded-t-3xl">
            <Dialog.Title className="text-2xl font-bold text-primary-500 flex items-center gap-2">
              {/* <span className="text-3xl">✨</span> */}
              Thêm Link Mới
            </Dialog.Title>
            <button
              onClick={onClose}
              className="neuro-button p-2 rounded-xl hover:neuro-purple hover:text-white transition-all"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* URL Input */}
            <div>
              <label className="block text-sm font-semibold text-primary-500 mb-3 flex items-center gap-2">
                {/* <span className="text-xl">🔗</span> */}
                URL Website
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 neuro-input px-4 py-3 text-primary-500 placeholder:text-primary-400"
                  required
                />
                <button
                  type="button"
                  onClick={fetchMetadata}
                  disabled={loading}
                  className="neuro-purple px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
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
              <div className="neuro-card p-5 rounded-2xl border-2 border-secondary-300">
                <h4 className="font-bold text-secondary-500 mb-4 flex items-center gap-2 text-lg">
                  {/* <span className="text-2xl">👀</span> */}
                  Preview
                </h4>
                {metadata.image && (
                  <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden neuro-button">
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
                    <h5 className="font-bold text-primary-500 text-lg">
                      {metadata.title}
                    </h5>
                    <p className="text-sm text-primary-600 mt-1">
                      {metadata.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-primary-500 mb-3 flex items-center gap-2">
                {/* <span className="text-xl">📂</span> */}
                Danh mục
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full neuro-input px-4 py-3 text-primary-500 cursor-pointer"
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
              <label className="block text-sm font-semibold text-primary-500 mb-3 flex items-center gap-2">
                {/* <span className="text-xl">🏷️</span> */}
                Tags (tùy chọn)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="design, tools, ai (cách nhau bởi dấu phẩy)"
                className="w-full neuro-input px-4 py-3 text-primary-500 placeholder:text-primary-400"
              />
              <p className="text-xs text-primary-600 mt-2 ml-1">
                Nhập các tag cách nhau bởi dấu phẩy
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!metadata || !formData.category}
              className="w-full neuro-purple py-4 rounded-2xl text-white font-bold text-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              {/* <span className="text-2xl">🚀</span> */}
              Gửi Link
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
