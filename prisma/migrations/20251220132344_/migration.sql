-- DropIndex
DROP INDEX "User_id_key";

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
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("city", "entrance", "id", "numberOfFlat", "numberOfHouse", "street", "userId") SELECT "city", "entrance", "id", "numberOfFlat", "numberOfHouse", "street", "userId" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
