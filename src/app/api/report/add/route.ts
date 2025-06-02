import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Allowed status values
const ALLOWED_STATUSES = ["حاضر", "غایب", "مرخصی", "تأخیر"];

export async function POST(req: NextRequest) {
  try {
    const { employeeId, shiftId, status } = await req.json();

    // اعتبارسنجی ورودی‌ها
    if (!employeeId || !shiftId || !status) {
      return NextResponse.json(
        { error: "شناسه کارمند، شناسه شیفت و وضعیت الزامی می‌باشند" },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { 
          error: `وضعیت نامعتبر است. وضعیت‌های مجاز: ${ALLOWED_STATUSES.join("، ")}`
        },
        { status: 400 }
      );
    }

    const employeeExists = await prisma.employee.findUnique({
      where: { id: employeeId }
    });

    const shiftExists = await prisma.shift.findUnique({
      where: { id: shiftId }
    });

    if (!employeeExists || !shiftExists) {
      return NextResponse.json(
        { 
          success: false,
          error: employeeExists ? "شیفت یافت نشد" : "کارمند یافت نشد"
        },
        { status: 404 }
      );
    }

    const newReport = await prisma.report.create({
      data: {
        status,
        employeeId,
        shiftId
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "گزارش با موفقیت ثبت شد",
        data: newReport,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطا در ثبت گزارش:", error);
    return NextResponse.json(
      {
        success: false,
        error: "خطای سرور. لطفاً مجدداً تلاش نمایید",
      },
      { status: 500 }
    );
  }
}