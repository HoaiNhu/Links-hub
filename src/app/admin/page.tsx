import { HiLink, HiUsers, HiFolder, HiClock } from "react-icons/hi";
import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";
import User from "@/models/User";
import Category from "@/models/Category";
import StatsCard from "@/components/StatsCard";

async function getStats() {
  await connectDB();

  const [totalLinks, totalUsers, totalCategories, pendingLinks, recentLinks] =
    await Promise.all([
      Link.countDocuments({ status: "approved" }),
      User.countDocuments(),
      Category.countDocuments(),
      Link.countDocuments({ status: "pending" }),
      Link.find({ status: "approved" })
        .populate("category")
        .populate("submittedBy", "name email")
        .sort({ createdAt: -1 })
        .limit(10)
        .lean(),
    ]);

  return {
    totalLinks,
    totalUsers,
    totalCategories,
    pendingLinks,
    recentLinks: JSON.parse(JSON.stringify(recentLinks)),
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Tổng quan hệ thống</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tổng Links"
          value={stats.totalLinks}
          icon={<HiLink className="w-8 h-8" />}
          color="blue"
        />
        <StatsCard
          title="Người dùng"
          value={stats.totalUsers}
          icon={<HiUsers className="w-8 h-8" />}
          color="green"
        />
        <StatsCard
          title="Danh mục"
          value={stats.totalCategories}
          icon={<HiFolder className="w-8 h-8" />}
          color="purple"
        />
        <StatsCard
          title="Chờ duyệt"
          value={stats.pendingLinks}
          icon={<HiClock className="w-8 h-8" />}
          color="yellow"
        />
      </div>

      {/* Recent Links */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Links gần đây</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người gửi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lượt xem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentLinks.map((link: any) => (
                <tr key={link._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {link.favicon && (
                        <img
                          src={link.favicon}
                          alt=""
                          className="w-5 h-5 rounded"
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
                          className="text-xs text-blue-600 hover:underline truncate block"
                        >
                          {link.url}
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
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {link.submittedBy?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {link.views || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(link.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
