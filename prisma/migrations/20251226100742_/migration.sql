/*
  Warnings:

  - Added the required column `status` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

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
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "entrance", "id", "numberOfFlat", "numberOfHouse", "street", "userId") SELECT "city", "entrance", "id", "numberOfFlat", "numberOfHouse", "street", "userId" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "patronMik" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "cityName" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("cityName", "comment", "email", "firstName", "id", "patronMik", "paymentMethod", "phoneNumber") SELECT "cityName", "comment", "email", "firstName", "id", "patronMik", "paymentMethod", "phoneNumber" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
