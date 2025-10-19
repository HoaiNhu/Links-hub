import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { requireAdmin } from "@/lib/auth";

// GET - Lấy tất cả categories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find().sort({ name: 1 }).lean();

    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Tạo category mới (Admin only)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    await requireAdmin();

    const data = await request.json();

    // Generate slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, "-");

    const category = await Category.create({
      ...data,
      slug,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
