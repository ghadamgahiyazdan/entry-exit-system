/*
  Warnings:

  - You are about to alter the column `employeeId` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Employee" ("createdAt", "deleted_at", "employeeId", "id", "is_delete", "name") SELECT "createdAt", "deleted_at", "employeeId", "id", "is_delete", "name" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_employeeId_key" ON "Employee"("employeeId");
CREATE TABLE "new_Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" DATETIME
);
INSERT INTO "new_Report" ("createdAt", "deleted_at", "employeeId", "id", "is_delete", "shiftId", "status", "updatedAt") SELECT "createdAt", "deleted_at", "employeeId", "id", "is_delete", "shiftId", "status", "updatedAt" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
CREATE INDEX "Report_employeeId_shiftId_idx" ON "Report"("employeeId", "shiftId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
