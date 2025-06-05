import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

// Recommended: Use a single PrismaClient instance
const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch reports with necessary fields
    const reports = await prisma.report.findMany({
      where: { is_delete: false },
      select: {
        id: true,
        status: true,
        createdAt: true,
        employeeId: true,
        shiftId: true,
      },
      orderBy: {
        createdAt: 'desc' // Optional: Sort by newest first
      },
    });

    // Early return if no reports found
    if (!reports.length) {
      return NextResponse.json(
        { data: [], message: "No reports found" },
        { status: 200 }
      );
    }

    // Get unique IDs to avoid duplicate queries
    const uniqueEmployeeIds = [...new Set(reports.map(r => r.employeeId))];
    const uniqueShiftIds = [...new Set(reports.map(r => r.shiftId))];

    // Fetch related data in parallel
    const [employees, shifts] = await Promise.all([
      prisma.employee.findMany({
        where: { id: { in: uniqueEmployeeIds } },
        select: { id: true, name: true, employeeId: true }
      }),
      prisma.shift.findMany({
        where: { id: { in: uniqueShiftIds } },
        select: { id: true, title: true }
      })
    ]);

    // Create lookup maps for faster access
    const employeeMap = new Map(employees.map(e => [e.id, e]));
    const shiftMap = new Map(shifts.map(s => [s.id, s]));

    // Combine the data
    const data = reports.map(report => ({
      ...report,
      employee: employeeMap.get(report.employeeId) || null,
      shift: shiftMap.get(report.shiftId) || null
    }));

    return NextResponse.json({ 
      data,
      count: data.length,
      success: true
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch reports",
        success: false
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}