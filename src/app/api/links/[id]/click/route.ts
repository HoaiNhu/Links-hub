import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Link from "@/models/Link";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    await Link.findByIdAndUpdate(params.id, {
      $inc: { clicks: 1 },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
