import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const ALLOWED_STATUSES = ["حاضر", "غایب", "مرخصی", "تأخیر"] as const;
type Status = typeof ALLOWED_STATUSES[number];

export async function POST(req: NextRequest) {
  try {
    const { employeeId, shiftId, status } = await req.json();

    // اعتبارسنجی فیلدهای ورودی
    const missingFields = [];
    if (!employeeId) missingFields.push("employeeId");
    if (!shiftId) missingFields.push("shiftId");
    if (!status) missingFields.push("status");

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "فیلدهای الزامی پر نشده‌اند",
          missingFields,
          message: `لطفاً موارد زیر را پر کنید: ${missingFields.join(", ")}`
        },
        { status: 422 }
      );
    }

    // اعتبارسنجی مقدار status
    if (!isValidStatus(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "وضعیت نامعتبر است",
          allowedStatuses: ALLOWED_STATUSES,
          message: `وضعیت‌های مجاز: ${ALLOWED_STATUSES.join("، ")}`
        },
        { status: 400 }
      );
    }

    // پیدا کردن کارمند بر اساس employeeId یکتا
    const employee = await prisma.employee.findUnique({
      where: { employeeId: parseInt(employeeId) }
    });

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          error: "کارمند یافت نشد",
          message: "شناسه کارمند معتبر نیست"
        },
        { status: 404 }
      );
    }

    // پیدا کردن شیفت بر اساس id
    const shift = await prisma.shift.findUnique({
      where: { id: parseInt(shiftId) }
    });

    if (!shift) {
      return NextResponse.json(
        {
          success: false,
          error: "شیفت یافت نشد",
          message: "شناسه شیفت معتبر نیست"
        },
        { status: 404 }
      );
    }

    // ایجاد گزارش جدید با استفاده از id اصلی کارمند و شیفت
    const newReport = await prisma.report.create({
      data: {
        status,
        employeeId: employee.id,
        shiftId: shift.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "گزارش با موفقیت ثبت شد",
        data: newReport
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("خطا در ثبت گزارش:", error);
    return NextResponse.json(
      {
        success: false,
        error: "خطای سرور داخلی",
        message: "خطایی در سرور رخ داده است. لطفاً مجدداً تلاش نمایید"
      },
      { status: 500 }
    );
  }
}

// تابع اعتبارسنجی وضعیت
function isValidStatus(status: string): status is Status {
  return ALLOWED_STATUSES.includes(status as Status);
}
