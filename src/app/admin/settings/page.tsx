"use client";
import { useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ApiClient } from "@/lib/api-client";
import { showToast } from "@/lib/toast-utils";
import LoadingSpinner from "@/components/LoadingSpinner";
import { RouteConfig, DEFAULT_ROUTES } from "@/lib/settings-config";
import { HiCog, HiSave, HiRefresh } from "react-icons/hi";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [routes, setRoutes] = useState<RouteConfig>(DEFAULT_ROUTES);

  // Check admin permission
  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push("/");
    }
  }, [session, status, router]);

  // Fetch current settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await ApiClient.get<{ routes: RouteConfig }>(
        "/api/settings"
      );
      // API có thể trả về data.routes hoặc data đã có routes
      if (data.routes) {
        setRoutes(data.routes);
      } else {
        setRoutes(DEFAULT_ROUTES);
      }
    } catch (error) {
      showToast.error(error);
      // Nếu lỗi, dùng default
      setRoutes(DEFAULT_ROUTES);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await ApiClient.put("/api/settings", { routes });
      showToast.success("Cập nhật settings thành công!");

      // Reload page để apply changes
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      showToast.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc muốn reset về mặc định?")) {
      setRoutes(DEFAULT_ROUTES);
      showToast.success("Đã reset về giá trị mặc định");
    }
  };

  if (status === "loading" || loading) {
    return <LoadingSpinner fullScreen message="Đang tải..." />;
  }

  if (!session || session.user.role !== "admin") {
    return null;
  }

  // Double check routes is valid
  if (!routes || !routes.loginPath) {
    return <LoadingSpinner fullScreen message="Đang tải settings..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <HiCog className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className=" mt-1">
                Tùy chỉnh các route paths và cấu hình website
              </p>
            </div>
          </div>
        </div>

        {/* Routes Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section Title */}
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-gray-900">Route Paths</h2>
              <p className="text-sm  mt-1">
                Customize các đường dẫn URL cho website
              </p>
            </div>

            {/* Login Path */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Login Path
              </label>
              <input
                type="text"
                value={routes.loginPath}
                onChange={(e) =>
                  setRoutes({ ...routes, loginPath: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="/auth/login"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Đường dẫn đến trang đăng nhập (ví dụ: /login, /auth/login,
                /login-user)
              </p>
            </div>

            {/* Register Path */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Register Path
              </label>
              <input
                type="text"
                value={routes.registerPath}
                onChange={(e) =>
                  setRoutes({ ...routes, registerPath: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="/auth/register"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Đường dẫn đến trang đăng ký (ví dụ: /register, /auth/register,
                /signup)
              </p>
            </div>

            {/* Admin Path */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Dashboard Path
              </label>
              <input
                type="text"
                value={routes.adminPath}
                onChange={(e) =>
                  setRoutes({ ...routes, adminPath: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="/admin"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Đường dẫn đến trang admin (ví dụ: /admin, /dashboard, /backend)
              </p>
            </div>

            {/* Home Path */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Home Path
              </label>
              <input
                type="text"
                value={routes.homePath}
                onChange={(e) =>
                  setRoutes({ ...routes, homePath: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="/"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Đường dẫn đến trang chủ (thường là /)
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex gap-2">
                <span className="text-yellow-600">⚠️</span>
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Paths phải bắt đầu bằng dấu /</li>
                    <li>
                      Sau khi lưu, trang sẽ tự động reload để áp dụng thay đổi
                    </li>
                    <li>Đảm bảo các paths không trùng nhau</li>
                    <li>Nếu có lỗi, bạn có thể reset về mặc định</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiSave className="w-5 h-5" />
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={saving}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <HiRefresh className="w-5 h-5" />
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Current Routes Preview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-blue-900 mb-3">
            🔍 Preview Routes hiện tại:
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-blue-800">
              <span className="font-semibold">Login:</span>{" "}
              <code className="bg-white px-2 py-1 rounded">
                {routes.loginPath}
              </code>
            </p>
            <p className="text-blue-800">
              <span className="font-semibold">Register:</span>{" "}
              <code className="bg-white px-2 py-1 rounded">
                {routes.registerPath}
              </code>
            </p>
            <p className="text-blue-800">
              <span className="font-semibold">Admin:</span>{" "}
              <code className="bg-white px-2 py-1 rounded">
                {routes.adminPath}
              </code>
            </p>
            <p className="text-blue-800">
              <span className="font-semibold">Home:</span>{" "}
              <code className="bg-white px-2 py-1 rounded">
                {routes.homePath}
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
