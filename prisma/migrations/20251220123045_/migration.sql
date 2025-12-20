/*
  Warnings:

  - You are about to drop the column `patronMik` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `patronMik` on the `User` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronymic` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patronymic` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Delivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Delivery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Delivery" ("city", "email", "firstName", "id", "lastName", "userId") SELECT "city", "email", "firstName", "id", "lastName", "userId" FROM "Delivery";
DROP TABLE "Delivery";
ALTER TABLE "new_Delivery" RENAME TO "Delivery";
CREATE UNIQUE INDEX "Delivery_id_key" ON "Delivery"("id");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "phoneNumber" TEXT NOT NULL
);
INSERT INTO "new_User" ("birthDate", "email", "firstName", "id", "lastName", "password", "phoneNumber") SELECT "birthDate", "email", "firstName", "id", "lastName", "password", "phoneNumber" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
