/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `fullDescription` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("categoryId", "count", "description", "discount", "id", "image", "name", "price") SELECT "categoryId", "count", "description", "discount", "id", "image", "name", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");
CREATE TABLE "new_ProductBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "blockAlign" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "blockOrder" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ProductBlock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductBlock" ("blockAlign", "blockOrder", "description", "id", "image", "productId", "title") SELECT "blockAlign", "blockOrder", "description", "id", "image", "productId", "title" FROM "ProductBlock";
DROP TABLE "ProductBlock";
ALTER TABLE "new_ProductBlock" RENAME TO "ProductBlock";
CREATE UNIQUE INDEX "ProductBlock_id_key" ON "ProductBlock"("id");
CREATE TABLE "new_ProductOnOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "blockId" INTEGER NOT NULL,
    CONSTRAINT "ProductOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductOnOrder_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductOnOrder" ("blockId", "id", "productId") SELECT "blockId", "id", "productId" FROM "ProductOnOrder";
DROP TABLE "ProductOnOrder";
ALTER TABLE "new_ProductOnOrder" RENAME TO "ProductOnOrder";
CREATE UNIQUE INDEX "ProductOnOrder_id_key" ON "ProductOnOrder"("id");
CREATE UNIQUE INDEX "ProductOnOrder_productId_key" ON "ProductOnOrder"("productId");
CREATE UNIQUE INDEX "ProductOnOrder_blockId_key" ON "ProductOnOrder"("blockId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
