-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fullDescription" TEXT,
    "count" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "image" TEXT NOT NULL,
    "blockAlign" TEXT NOT NULL DEFAULT 'left',
    "blockOrder" INTEGER NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ProductBlock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductBlock" ("blockAlign", "blockOrder", "description", "id", "image", "productId", "title") SELECT "blockAlign", "blockOrder", "description", "id", "image", "productId", "title" FROM "ProductBlock";
DROP TABLE "ProductBlock";
ALTER TABLE "new_ProductBlock" RENAME TO "ProductBlock";
CREATE UNIQUE INDEX "ProductBlock_id_key" ON "ProductBlock"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
