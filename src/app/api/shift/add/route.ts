import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "عنوان شیفت و توضیحات الزامی می‌باشند" },
        { status: 400 }
      );
    }

    const existingShift = await prisma.shift.findFirst({
      where: {
        title: title
      }
    });

    if (existingShift) {
      return NextResponse.json(
        { 
          success: false,
          error: "شیفت با این عنوان قبلاً ثبت شده است"
        },
        { status: 409 }
      );
    }

    const newShift = await prisma.shift.create({
      data: {
        title,
        description
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "شیفت با موفقیت ثبت شد",
        data: newShift,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("خطا در ثبت شیفت:", error);
    return NextResponse.json(
      {
        success: false,
        error: "خطای سرور. لطفاً مجدداً تلاش نمایید",
      },
      { status: 500 }
    );
  }
}