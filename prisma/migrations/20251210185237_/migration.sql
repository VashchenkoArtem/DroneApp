/*
  Warnings:

  - You are about to drop the column `blockId` on the `ProductBlock` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductBlock` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
INSERT INTO "new_ProductBlock" ("blockAlign", "blockOrder", "description", "id", "image", "title") SELECT "blockAlign", "blockOrder", "description", "id", "image", "title" FROM "ProductBlock";
DROP TABLE "ProductBlock";
ALTER TABLE "new_ProductBlock" RENAME TO "ProductBlock";
CREATE UNIQUE INDEX "ProductBlock_id_key" ON "ProductBlock"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
