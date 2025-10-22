"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiMail, HiLockClosed, HiUser } from "react-icons/hi";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Mật khẩu không khớp!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    setLoading(true);
    const registerToast = toast.loading("Đang đăng ký...");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Đăng ký thất bại");
      }

      toast.success("Đăng ký thành công! Đang chuyển hướng...", {
        id: registerToast,
      });

      // Redirect to login
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Đăng ký thất bại";
      toast.error(errorMessage, { id: registerToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="neuro-card rounded-3xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 neuro-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">✨</span>
          </div>
          <h1 className="text-3xl font-bold text-primary-500">Đăng ký</h1>
          <p className="text-primary-600 mt-2">Tạo tài khoản mới 🚀</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-primary-500 mb-2">
              👤 Họ tên
            </label>
            <div className="neuro-input flex items-center gap-3 px-4 py-3">
              <HiUser className="text-primary-500 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="flex-1 bg-transparent outline-none text-primary-500 placeholder:text-primary-400"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-primary-500 mb-2">
              📧 Email
            </label>
            <div className="neuro-input flex items-center gap-3 px-4 py-3">
              <HiMail className="text-primary-500 w-5 h-5 flex-shrink-0" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="flex-1 bg-transparent outline-none text-primary-500 placeholder:text-primary-400"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-primary-500 mb-2">
              🔒 Mật khẩu
            </label>
            <div className="neuro-input flex items-center gap-3 px-4 py-3">
              <HiLockClosed className="text-primary-500 w-5 h-5 flex-shrink-0" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="flex-1 bg-transparent outline-none text-primary-500 placeholder:text-primary-400"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-primary-500 mb-2">
              🔑 Xác nhận mật khẩu
            </label>
            <div className="neuro-input flex items-center gap-3 px-4 py-3">
              <HiLockClosed className="text-primary-500 w-5 h-5 flex-shrink-0" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="flex-1 bg-transparent outline-none text-primary-500 placeholder:text-primary-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full neuro-purple py-4 rounded-2xl text-white font-bold text-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang xử lý..." : "🚀 Đăng ký"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-primary-200" />
          <span className="text-sm text-primary-400">hoặc</span>
          <div className="flex-1 h-px bg-primary-200" />
        </div>

        {/* Login Link */}
        <p className="text-center text-primary-600">
          Đã có tài khoản?{" "}
          <Link
            href="/auth/login"
            className="text-secondary-500 font-semibold hover:text-secondary-600 transition-colors"
          >
            Đăng nhập
          </Link>
        </p>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="neuro-button px-6 py-2 rounded-xl text-primary-500 hover:scale-105 transition-all inline-block"
          >
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
