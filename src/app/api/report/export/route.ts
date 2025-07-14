import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import ExcelJS from 'exceljs';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch reports with related data
    const reports = await prisma.report.findMany({
      where: { is_delete: false },
      include: {
        employee: {
          select: {
            name: true,
            employeeId: true
          }
        },
        shift: {
          select: {
            title: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reports');

    // Add headers with Persian titles
    worksheet.columns = [
      { header: 'شناسه گزارش', key: 'id', width: 15 },
      { header: 'تاریخ ایجاد', key: 'createdAt', width: 20 },
      { header: 'وضعیت', key: 'status', width: 15 },
      { header: 'نام کارمند', key: 'employeeName', width: 20 },
      { header: 'کد کارمند', key: 'employeeCode', width: 15 },
      { header: 'شیفت', key: 'shift', width: 20 }
    ];

    // Add data rows
    reports.forEach(report => {
      worksheet.addRow({
        id: report.id,
        createdAt: new Date(report.createdAt).toLocaleString('fa-IR'),
        status: report.status,
        employeeName: report.employee.name,
        employeeCode: report.employee.employeeId,
        shift: report.shift.title
      });
    });

    // Style headers
    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD3D3D3' }
      };
      cell.alignment = { horizontal: 'right' };
    });

    // Generate Excel file buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Create response
    return new NextResponse(buffer, {
      status: 200,
      headers: new Headers({
        'Content-Disposition': 'attachment; filename=reports.xlsx',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
    });

  } catch (error) {
    console.error("Error generating Excel report:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate report",
        success: false
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}