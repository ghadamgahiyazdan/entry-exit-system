import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, employeeId } = await req.json();

    // اعتبارسنجی ورودی‌ها
    if (!name || !employeeId) {
      return NextResponse.json(
        { error: "نام و شماره پرسنلی الزامی می‌باشند" },
        { status: 400 }
      );
    }

    // بررسی تکراری نبودن شماره پرسنلی
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        employeeId
      }
    });

    if (existingEmployee) {
      return NextResponse.json(
        { 
          success: false,
          error: "شماره پرسنلی تکراری است" 
        },
        { status: 409 }
      );
    }

    // ایجاد کارمند جدید
    const newEmployee = await prisma.employee.create({
      data: {
        name,
        employeeId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "کارمند با موفقیت ثبت شد",
        data: newEmployee,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطا در ثبت کارمند:", error);
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