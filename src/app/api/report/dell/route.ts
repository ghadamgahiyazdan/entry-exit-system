import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { reportId } = await req.json();

    // Input validation
    if (reportId === undefined || reportId === null) {
      return NextResponse.json(
        { 
          success: false,
          error: "شناسه گزارش الزامی می‌باشد" 
        },
        { status: 400 }
      );
    }

    // Type validation
    const id = Number(reportId);
    if (isNaN(id)) {
      return NextResponse.json(
        { 
          success: false,
          error: "شناسه گزارش باید عدد باشد" 
        },
        { status: 400 }
      );
    }

    // Check if report exists
    const existingReport = await prisma.report.findUnique({
      where: { id }
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

    // Check if already deleted
    if (existingReport.is_delete) {
      return NextResponse.json(
        { 
          success: false,
          error: "این گزارش قبلاً حذف شده است" 
        },
        { status: 410 }
      );
    }

    // Perform soft delete with proper date format
    const deletedReport = await prisma.report.update({
      where: { id },
      data: {
        is_delete: true,
        deleted_at: new Date() // Store as DateTime instead of string
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "گزارش با موفقیت حذف شد",
        data: {
          id: deletedReport.id,
          deleted_at: new Date(deletedReport.deleted_at || '').toLocaleDateString('fa-IR')
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("خطا در حذف گزارش:", error);

    return NextResponse.json(
      {
        success: false,
        error: "خطای سرور. لطفاً مجدداً تلاش نمایید",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}