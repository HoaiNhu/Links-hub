"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { HiPlus, HiMenu, HiX, HiUser, HiLogout, HiCog } from "react-icons/hi";
import AddLinkModal from "./AddLinkModal";
import { ICategory } from "@/lib/type";
import { useSettings } from "@/contexts/SettingsContext";
import { DEFAULT_ROUTES } from "@/lib/settings-config";

interface NavbarProps {
  categories: ICategory[];
}

export default function Navbar({ categories }: NavbarProps) {
  const { data: session } = useSession();
  const { settings } = useSettings();
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Safety check: use default routes if settings.routes is undefined
  const routes = settings?.routes || DEFAULT_ROUTES;

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-xl text-gray-900">LinksHub</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <HiPlus className="w-5 h-5" />
                    Thêm Link
                  </button>

                  {/* Admin Link */}
                  {session.user?.role === "admin" && (
                    <Link
                      href={routes.adminPath}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <HiCog className="w-5 h-5" />
                      Admin
                    </Link>
                  )}

                  {/* User Menu */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {session.user?.name}
                      </p>
                      <p className="text-xs  font-medium">
                        {session.user?.role === "admin" ? "👑 Admin" : "User"}
                      </p>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Đăng xuất"
                    >
                      <HiLogout className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href={routes.loginPath}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href={routes.registerPath}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {session ? (
                <>
                  <button
                    onClick={() => {
                      setShowAddModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <HiPlus className="w-5 h-5" />
                    Thêm Link
                  </button>

                  {session.user?.role === "admin" && (
                    <Link
                      href={routes.adminPath}
                      className="w-full flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <HiCog className="w-5 h-5" />
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    <HiLogout className="w-5 h-5" />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={routes.loginPath}
                    className="w-full block px-4 py-3 text-center border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href={routes.registerPath}
                    className="w-full block px-4 py-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Add Link Modal */}
      {session && (
        <AddLinkModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          categories={categories}
          onSuccess={() => {
            // Reload page hoặc refetch data
            window.location.reload();
          }}
        />
      )}
    </>
  );
}
