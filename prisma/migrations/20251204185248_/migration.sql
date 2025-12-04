/*
  Warnings:

  - Added the required column `blockId` to the `ProductBlock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductSpecifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ProductOnOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "ProductOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "blockAlign" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "blockOrder" INTEGER NOT NULL,
    "blockId" INTEGER NOT NULL,
    CONSTRAINT "ProductBlock_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductBlock" ("blockAlign", "blockOrder", "description", "id", "image", "title") SELECT "blockAlign", "blockOrder", "description", "id", "image", "title" FROM "ProductBlock";
DROP TABLE "ProductBlock";
ALTER TABLE "new_ProductBlock" RENAME TO "ProductBlock";
CREATE UNIQUE INDEX "ProductBlock_id_key" ON "ProductBlock"("id");
CREATE UNIQUE INDEX "ProductBlock_blockId_key" ON "ProductBlock"("blockId");
CREATE TABLE "new_ProductSpecifications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "codeType" TEXT NOT NULL,
    "characteristic1" TEXT NOT NULL,
    "characteristic2" TEXT NOT NULL,
    "characteristic3" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ProductSpecifications_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductSpecifications" ("characteristic1", "characteristic2", "characteristic3", "codeType", "description", "id", "title") SELECT "characteristic1", "characteristic2", "characteristic3", "codeType", "description", "id", "title" FROM "ProductSpecifications";
DROP TABLE "ProductSpecifications";
ALTER TABLE "new_ProductSpecifications" RENAME TO "ProductSpecifications";
CREATE UNIQUE INDEX "ProductSpecifications_id_key" ON "ProductSpecifications"("id");
CREATE UNIQUE INDEX "ProductSpecifications_productId_key" ON "ProductSpecifications"("productId");
CREATE TABLE "new_Delivery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "patronMik" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Delivery_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Delivery" ("city", "email", "firstName", "id", "lastName", "patronMik", "phoneNumber") SELECT "city", "email", "firstName", "id", "lastName", "patronMik", "phoneNumber" FROM "Delivery";
DROP TABLE "Delivery";
ALTER TABLE "new_Delivery" RENAME TO "Delivery";
CREATE UNIQUE INDEX "Delivery_id_key" ON "Delivery"("id");
CREATE UNIQUE INDEX "Delivery_authorId_key" ON "Delivery"("authorId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "ProductOnOrder_id_key" ON "ProductOnOrder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductOnOrder_productId_key" ON "ProductOnOrder"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductOnOrder_orderId_key" ON "ProductOnOrder"("orderId");
