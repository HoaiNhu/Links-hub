import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Category from "@/models/Category"; // Import để register schema
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import User from "@/models/User"; // Import để register schema
import { requireAdmin } from "@/lib/auth";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// PUT - Update link (Admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    await requireAdmin();

    const { id } = await params;
    const data = await request.json();

    const link = await Link.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate("category")
      .populate("submittedBy", "name email");

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(link);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: errorMessage },
      { status: errorMessage.includes("Forbidden") ? 403 : 500 }
    );
  }
}

// DELETE - Xóa link (Admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    await requireAdmin();

    const { id } = await params;
    const link = await Link.findByIdAndDelete(id);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Link deleted" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: errorMessage },
      { status: errorMessage.includes("Forbidden") ? 403 : 500 }
    );
  }
}
