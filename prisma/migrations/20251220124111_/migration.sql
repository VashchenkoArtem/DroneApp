/*
  Warnings:

  - You are about to drop the `Delivery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Delivery";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "numderOfHouse" INTEGER NOT NULL,
    "numberOfFlat" INTEGER NOT NULL,
    "entrance" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_id_key" ON "Address"("id");
