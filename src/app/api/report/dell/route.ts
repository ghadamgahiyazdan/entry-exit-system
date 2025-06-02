import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { reportId } = await req.json();

    // اعتبارسنجی ورودی
    if (!reportId) {
      return NextResponse.json(
        { error: "شناسه گزارش الزامی می‌باشد" },
        { status: 400 }
      );
    }

    // بررسی نوع داده
    if (typeof reportId !== "number") {
      return NextResponse.json(
        { error: "شناسه گزارش باید عدد باشد" },
        { status: 400 }
      );
    }

    // بررسی وجود گزارش
    const existingReport = await prisma.report.findUnique({
      where: { id: reportId }
    });

    if (!existingReport) {
      return NextResponse.json(
        { 
          success: false,
          error: "گزارش یافت نشد"
        },
        { status: 404 }
      );
    }
    
    // انجام soft delete
    const deletedReport = await prisma.report.update({
      where: { id: reportId },
      data: {
        deleted_at: new Date().toLocaleDateString('fa-IR'),
        is_delete: true
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "گزارش با موفقیت حذف شد",
        data: deletedReport,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در حذف گزارش:", error);

    // خطای عمومی سرور
    return NextResponse.json(
      {
        success: false,
        error: "خطای سرور. لطفاً مجدداً تلاش نمایید",
      },
      { status: 500 }
    );
  }
}