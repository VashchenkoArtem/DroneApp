/*
  Warnings:

  - You are about to drop the column `orderId` on the `ProductOnOrder` table. All the data in the column will be lost.
  - Added the required column `blockId` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductOnOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "blockId" INTEGER NOT NULL,
    CONSTRAINT "ProductOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductOnOrder_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductOnOrder" ("id", "productId") SELECT "id", "productId" FROM "ProductOnOrder";
DROP TABLE "ProductOnOrder";
ALTER TABLE "new_ProductOnOrder" RENAME TO "ProductOnOrder";
CREATE UNIQUE INDEX "ProductOnOrder_id_key" ON "ProductOnOrder"("id");
CREATE UNIQUE INDEX "ProductOnOrder_productId_key" ON "ProductOnOrder"("productId");
CREATE UNIQUE INDEX "ProductOnOrder_blockId_key" ON "ProductOnOrder"("blockId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
