import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";
import Category from "@/models/Category";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import User from "@/models/User"; // Import để Mongoose đăng ký schema cho populate
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import FeaturedLinks from "@/components/FeaturedLinks";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

async function getData() {
  await connectDB();

  // Đảm bảo User model được load trước khi populate
  const UserModel = (await import("@/models/User")).default;
  console.log("User model loaded:", !!UserModel);

  const [links, categories, totalUsers] = await Promise.all([
    Link.find({ status: "approved" })
      .populate("category")
      .populate("submittedBy", "name")
      .sort({ createdAt: -1 })
      .lean(),
    Category.find().sort({ name: 1 }).lean(),
    UserModel.countDocuments(),
  ]);

  return {
    links: JSON.parse(JSON.stringify(links)),
    categories: JSON.parse(JSON.stringify(categories)),
    totalUsers,
  };
}

export default async function HomePage() {
  const { links, categories, totalUsers } = await getData();

  // Calculate total views and clicks
  const totalViews = links.reduce(
    (sum: number, link: { views?: number }) => sum + (link.views || 0),
    0
  );
  const totalClicks = links.reduce(
    (sum: number, link: { clicks?: number }) => sum + (link.clicks || 0),
    0
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Counter */}
      <StatsCounter
        totalLinks={links.length}
        totalCategories={categories.length}
        totalUsers={totalUsers}
        totalViews={totalViews + totalClicks}
      />

      {/* Featured Links */}
      <FeaturedLinks links={links} />

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
