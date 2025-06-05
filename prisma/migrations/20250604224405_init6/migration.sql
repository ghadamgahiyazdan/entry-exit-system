/*
  Warnings:

  - You are about to drop the `_EmployeeToShift` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_EmployeeToShift_B_index";

-- DropIndex
DROP INDEX "_EmployeeToShift_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_EmployeeToShift";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_EmployeeShifts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EmployeeShifts_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EmployeeShifts_B_fkey" FOREIGN KEY ("B") REFERENCES "Shift" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" DATETIME,
    CONSTRAINT "Report_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Report_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Report" ("createdAt", "deleted_at", "employeeId", "id", "is_delete", "shiftId", "status", "updatedAt") SELECT "createdAt", "deleted_at", "employeeId", "id", "is_delete", "shiftId", "status", "updatedAt" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
CREATE INDEX "Report_employeeId_shiftId_idx" ON "Report"("employeeId", "shiftId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeShifts_AB_unique" ON "_EmployeeShifts"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeShifts_B_index" ON "_EmployeeShifts"("B");
