import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { employeeId } = await req.json();

    // اعتبارسنجی ورودی
    if (!employeeId) {
      return NextResponse.json(
        { error: "شناسه کارمند الزامی می‌باشد" },
        { status: 400 }
      );
    }

    if (typeof employeeId !== "number") {
      return NextResponse.json(
        { error: "شناسه کارمند باید عدد باشد" },
        { status: 400 }
      );
    }

    // بررسی وجود کارمند
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!existingEmployee) {
      return NextResponse.json(
        {
          success: false,
          error: "کارمند یافت نشد",
        },
        { status: 404 }
      );
    }

    // انجام حذف نرم (soft delete)
    const deletedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        deleted_at: new Date(),
        is_delete: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "کارمند با موفقیت حذف شد",
        data: deletedEmployee,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در حذف کارمند:", error);

    return NextResponse.json(
      {
        success: false,
        error: "خطای سرور. لطفاً مجدداً تلاش نمایید",
      },
      { status: 500 }
    );
  }
}
