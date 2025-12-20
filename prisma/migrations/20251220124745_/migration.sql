/*
  Warnings:

  - You are about to drop the column `numderOfHouse` on the `Address` table. All the data in the column will be lost.
  - Added the required column `numberOfHouse` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "numberOfHouse" INTEGER NOT NULL,
    "numberOfFlat" INTEGER NOT NULL,
    "entrance" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "entrance", "id", "numberOfFlat", "street", "userId") SELECT "city", "entrance", "id", "numberOfFlat", "street", "userId" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
