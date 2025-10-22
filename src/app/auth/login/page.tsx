"use client";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiMail, HiLockClosed } from "react-icons/hi";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loginToast = toast.loading("Đang đăng nhập...");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Email hoặc mật khẩu không đúng!", { id: loginToast });
      } else {
        toast.success("Đăng nhập thành công!", { id: loginToast });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!", { id: loginToast });
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
            <span className="text-white font-bold text-2xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-primary-500">Đăng nhập</h1>
          <p className="text-primary-600 mt-2">Chào mừng trở lại! 👋</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full neuro-purple py-4 rounded-2xl text-white font-bold text-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang xử lý..." : "🚀 Đăng nhập"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-primary-200" />
          <span className="text-sm text-primary-400">hoặc</span>
          <div className="flex-1 h-px bg-primary-200" />
        </div>

        {/* Register Link */}
        <p className="text-center text-primary-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/auth/register"
            className="text-secondary-500 font-semibold hover:text-secondary-600 transition-colors"
          >
            Đăng ký ngay
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
