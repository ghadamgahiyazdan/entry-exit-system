import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  try {
    const { shiftId } = await req.json();

    // اعتبارسنجی وجود شناسه
    if (!shiftId) {
      return NextResponse.json(
        { success: false, error: "شناسه شیفت الزامی است" },
        { status: 400 }
      );
    }

    // اعتبارسنجی نوع داده
    const id = parseInt(shiftId);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "شناسه شیفت نامعتبر است" },
        { status: 400 }
      );
    }

    // بررسی وجود و وضعیت شیفت
    const existingShift = await prisma.shift.findUnique({
      where: { id },
    });

    if (!existingShift) {
      return NextResponse.json(
        { success: false, error: "شیفت یافت نشد" },
        { status: 404 }
      );
    }

    if (existingShift.is_delete) {
      return NextResponse.json(
        { success: false, error: "این شیفت قبلاً حذف شده است" },
        { status: 410 }
      );
    }

    // انجام حذف نرم (soft delete)
    const deletedShift = await prisma.shift.update({
      where: { id },
      data: {
        deleted_at: new Date(),
        is_delete: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "شیفت با موفقیت حذف شد",
        data: {
          id: deletedShift.id,
          title: deletedShift.title,
          deleted_at: deletedShift.deleted_at,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("خطا در حذف شیفت:", error);

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
