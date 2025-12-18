/*
  Warnings:

  - You are about to drop the column `authorId` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Delivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "patronMik" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Delivery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Delivery" ("city", "email", "firstName", "id", "lastName", "patronMik", "phoneNumber") SELECT "city", "email", "firstName", "id", "lastName", "patronMik", "phoneNumber" FROM "Delivery";
DROP TABLE "Delivery";
ALTER TABLE "new_Delivery" RENAME TO "Delivery";
CREATE UNIQUE INDEX "Delivery_id_key" ON "Delivery"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
