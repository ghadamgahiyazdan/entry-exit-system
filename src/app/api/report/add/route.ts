import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Allowed status values
const ALLOWED_STATUSES = ["حاضر", "غایب", "مرخصی", "تأخیر"] as const;
type Status = typeof ALLOWED_STATUSES[number];

export async function POST(req: NextRequest) {
  try {
    const { employeeId, shiftId, status } = await req.json();

    // Validate required fields
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

    // Validate status value
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

    // Convert and validate IDs
    const employeeIdNum = Number(employeeId);
    const shiftIdNum = Number(shiftId);
    
    if (isNaN(employeeIdNum)) {
      return NextResponse.json(
        {
          success: false,
          error: "شناسه کارمند نامعتبر است",
          message: "شناسه کارمند باید عدد باشد"
        },
        { status: 400 }
      );
    }

    if (isNaN(shiftIdNum)) {
      return NextResponse.json(
        {
          success: false,
          error: "شناسه شیفت نامعتبر است",
          message: "شناسه شیفت باید عدد باشد"
        },
        { status: 400 }
      );
    }

    // Check if employee exists
    const employeeExists = await prisma.employee.findUnique({
      where: { employeeId: employeeIdNum }
    });

    if (!employeeExists) {
      return NextResponse.json(
        {
          success: false,
          error: "کارمند یافت نشد",
          message: "شناسه کارمند معتبر نیست"
        },
        { status: 404 }
      );
    }

    // Check if shift exists
    const shiftExists = await prisma.shift.findUnique({
      where: { id: shiftIdNum }
    });

    if (!shiftExists) {
      return NextResponse.json(
        {
          success: false,
          error: "شیفت یافت نشد",
          message: "شناسه شیفت معتبر نیست"
        },
        { status: 404 }
      );
    }

    // Create report
    const newReport = await prisma.report.create({
      data: {
        status,
        employeeId: employeeIdNum,
        shiftId: shiftIdNum
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

// Type guard for status validation
function isValidStatus(status: string): status is Status {
  return ALLOWED_STATUSES.includes(status as Status);
}