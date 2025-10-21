import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Category from "@/models/Category"; // Import để register schema
import { getCurrentUser } from "@/lib/auth";

// GET - Lấy danh sách links
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status") || "approved";
    const search = searchParams.get("search");

    interface QueryFilter {
      status: string;
      category?: string;
      $or?: Array<{
        title?: { $regex: string; $options: string };
        description?: { $regex: string; $options: string };
      }>;
    }

    const query: QueryFilter = { status };

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const links = await Link.find(query)
      .populate("category")
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(links);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("GET /api/links error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST - Tạo link mới
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.url || !data.title || !data.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const link = await Link.create({
      ...data,
      submittedBy: user.id,
      status: user.role === "admin" ? "approved" : "pending",
      approvedBy: user.role === "admin" ? user.id : undefined,
      approvedAt: user.role === "admin" ? new Date() : undefined,
    });

    const populatedLink = await Link.findById(link._id)
      .populate("category")
      .populate("submittedBy", "name email");

    return NextResponse.json(populatedLink, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("POST /api/links error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
