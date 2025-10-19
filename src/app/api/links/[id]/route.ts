import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";
import { requireAdmin } from "@/lib/auth";

interface RouteParams {
  params: {
    id: string;
  };
}

// PUT - Update link (Admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    await requireAdmin();

    const data = await request.json();

    const link = await Link.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    })
      .populate("category")
      .populate("submittedBy", "name email");

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(link);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes("Forbidden") ? 403 : 500 }
    );
  }
}

// DELETE - Xóa link (Admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    await requireAdmin();

    const link = await Link.findByIdAndDelete(params.id);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Link deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.message.includes("Forbidden") ? 403 : 500 }
    );
  }
}
