import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { DEFAULT_SETTINGS } from "@/lib/settings-config";

// GET - Lấy settings hiện tại
export async function GET() {
  try {
    await connectDB();

    // Lấy route settings từ DB
    const routeSettings = await Settings.findOne({ key: "routes" });

    if (!routeSettings) {
      // Nếu chưa có, trả về default
      return NextResponse.json({
        success: true,
        data: DEFAULT_SETTINGS,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        routes: routeSettings.value,
        siteName: DEFAULT_SETTINGS.siteName,
        siteDescription: DEFAULT_SETTINGS.siteDescription,
      },
    });
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json(
      { error: "Lỗi khi lấy settings" },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật settings (chỉ admin)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Không có quyền truy cập" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { routes } = body;

    // Validate routes
    if (!routes || typeof routes !== "object") {
      return NextResponse.json(
        { error: "Dữ liệu routes không hợp lệ" },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = [
      "loginPath",
      "registerPath",
      "adminPath",
      "homePath",
    ];
    for (const field of requiredFields) {
      if (!routes[field] || typeof routes[field] !== "string") {
        return NextResponse.json(
          { error: `Thiếu hoặc sai định dạng: ${field}` },
          { status: 400 }
        );
      }

      // Validate path format (phải bắt đầu bằng /)
      if (!routes[field].startsWith("/")) {
        return NextResponse.json(
          { error: `Path ${field} phải bắt đầu bằng /` },
          { status: 400 }
        );
      }
    }

    await connectDB();

    // Upsert settings
    const updatedSettings = await Settings.findOneAndUpdate(
      { key: "routes" },
      {
        key: "routes",
        value: routes,
        description: "Custom route paths configuration",
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Cập nhật settings thành công",
      data: updatedSettings,
    });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật settings" },
      { status: 500 }
    );
  }
}
