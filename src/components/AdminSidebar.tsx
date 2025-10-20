"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiLink,
  HiFolder,
  HiUsers,
  HiClock,
  HiChartBar,
  HiCog,
} from "react-icons/hi";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: HiHome,
  },
  {
    name: "Links",
    href: "/admin/links",
    icon: HiLink,
  },
  {
    name: "Pending Links",
    href: "/admin/pending",
    icon: HiClock,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: HiFolder,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: HiUsers,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: HiCog,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <p className="text-gray-400 text-sm mt-1">Quản lý hệ thống</p>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Back to Site */}
      <div className="mt-8 pt-8 border-t border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <HiHome className="w-5 h-5" />
          <span className="font-medium">Về trang chủ</span>
        </Link>
      </div>
    </aside>
  );
}
