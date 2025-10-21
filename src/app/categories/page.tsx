import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";
import Category from "@/models/Category";
import Navigation from "@/components/Navigation";
import CategoriesContent from "@/components/CategoriesContent";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

async function getData() {
  await connectDB();

  const [links, categories] = await Promise.all([
    Link.find({ status: "approved" })
      .populate("category")
      .populate("submittedBy", "name")
      .sort({ createdAt: -1 })
      .lean(),
    Category.find().sort({ name: 1 }).lean(),
  ]);

  // Group links by category
  const categoriesWithLinks = categories.map((cat) => ({
    ...cat,
    links: links.filter(
      (link: { category?: { _id?: { toString: () => string } } }) =>
        link.category?._id?.toString() === cat._id.toString()
    ),
  }));

  return {
    categories: JSON.parse(JSON.stringify(categoriesWithLinks)),
  };
}

export default async function CategoriesPage() {
  const { categories } = await getData();

  return (
    <div className="min-h-screen">
      <Navigation />
      <CategoriesContent categories={categories} />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
