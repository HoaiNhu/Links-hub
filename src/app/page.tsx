import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";
import Category from "@/models/Category";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import User from "@/models/User"; // Import để Mongoose đăng ký schema cho populate
import Navbar from "@/components/Navbar";
import LinkList from "@/components/LinkList";

async function getData() {
  await connectDB();

  // Đảm bảo User model được load trước khi populate
  const User = (await import("@/models/User")).default;
  console.log("User model loaded:", !!User);

  const [links, categories] = await Promise.all([
    Link.find({ status: "approved" })
      .populate("category")
      .populate("submittedBy", "name")
      .sort({ createdAt: -1 })
      .lean(),
    Category.find().sort({ name: 1 }).lean(),
  ]);

  return {
    links: JSON.parse(JSON.stringify(links)),
    categories: JSON.parse(JSON.stringify(categories)),
  };
}

export default async function HomePage() {
  const { links, categories } = await getData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar categories={categories} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">🔗 LinksHub</h1>
          <p className="text-xl text-blue-100 mb-8">
            Tổng hợp những website hữu ích cho developers và designers
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-3xl font-bold">{links.length}</p>
              <p className="text-sm text-blue-100">Websites</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-3xl font-bold">{categories.length}</p>
              <p className="text-sm text-blue-100">Categories</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LinkList initialLinks={links} categories={categories} />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">Made with ❤️ by LinksHub Team</p>
        </div>
      </footer>
    </div>
  );
}
