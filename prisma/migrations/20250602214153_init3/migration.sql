/*
  Warnings:

  - You are about to alter the column `deleted_at` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
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
