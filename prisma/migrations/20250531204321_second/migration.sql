/*
  Warnings:

  - You are about to drop the column `entryTime` on the `Shift` table. All the data in the column will be lost.
  - You are about to drop the column `exitTime` on the `Shift` table. All the data in the column will be lost.
  - Added the required column `time` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL
);
INSERT INTO "new_Shift" ("id", "title") SELECT "id", "title" FROM "Shift";
DROP TABLE "Shift";
ALTER TABLE "new_Shift" RENAME TO "Shift";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
