import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { employeeId } = await req.json();

    // اعتبارسنجی وجود شناسه
    if (!employeeId) {
      return NextResponse.json(
        { success: false, error: "شناسه کارمند الزامی است" },
        { status: 400 }
      );
    }

    // اعتبارسنجی نوع داده
    const id = parseInt(employeeId);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "شناسه کارمند نامعتبر است" },
        { status: 400 }
      );
    }

    // بررسی وجود و وضعیت کارمند
    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      return NextResponse.json(
        { success: false, error: "کارمند یافت نشد" },
        { status: 404 }
      );
    }

    if (existingEmployee.is_delete) {
      return NextResponse.json(
        { success: false, error: "این کارمند قبلاً حذف شده است" },
        { status: 410 }
      );
    }

    // انجام حذف نرم
    const deletedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        is_delete: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "کارمند با موفقیت حذف شد",
        data: {
          id: deletedEmployee.id,
          name: deletedEmployee.name,
          deleted_at: deletedEmployee.deleted_at,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در حذف کارمند:", error);

    // مدیریت خطاهای خاص Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { success: false, error: "خطای پایگاه داده" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "خطای سرور داخلی" },
      { status: 500 }
    );
  }
}
