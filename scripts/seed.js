const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Models
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
});

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  icon: String,
  color: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

require("dotenv").config({ path: ".env" });
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env file");
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await User.create({
      name: "Admin",
      email: "admin@linkshub.com",
      password: hashedPassword,
      role: "admin",
    });
    console.log("👤 Created admin user (admin@linkshub.com / admin123)");

    // Create categories
    const categories = [
      {
        name: "Design Tools",
        slug: "design-tools",
        description: "Tools for UI/UX designers",
        icon: "🎨",
        color: "#ec4899",
      },
      {
        name: "Development",
        slug: "development",
        description: "Developer tools and resources",
        icon: "💻",
        color: "#3b82f6",
      },
      {
        name: "AI Tools",
        slug: "ai-tools",
        description: "Artificial Intelligence tools",
        icon: "🤖",
        color: "#8b5cf6",
      },
      {
        name: "Productivity",
        slug: "productivity",
        description: "Productivity and organization tools",
        icon: "⚡",
        color: "#f59e0b",
      },
      {
        name: "Learning",
        slug: "learning",
        description: "Educational resources",
        icon: "📚",
        color: "#10b981",
      },
      {
        name: "Icons & Graphics",
        slug: "icons-graphics",
        description: "Free icons and graphics",
        icon: "🎭",
        color: "#ef4444",
      },
    ];

    await Category.insertMany(categories);
    console.log("📂 Created categories");

    console.log("\n✨ Seeding completed successfully!\n");
    console.log("Login credentials:");
    console.log("  Email: admin@linkshub.com");
    console.log("  Password: admin123\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
