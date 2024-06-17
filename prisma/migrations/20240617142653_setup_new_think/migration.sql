/*
  Warnings:

  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `walet` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "transaction";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_walet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "walletAddress" TEXT NOT NULL,
    "block" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    "value" BIGINT NOT NULL
);
INSERT INTO "new_walet" ("block", "hash", "status", "timeStamp", "value", "walletAddress") SELECT "block", "hash", "status", "timeStamp", "value", "walletAddress" FROM "walet";
DROP TABLE "walet";
ALTER TABLE "new_walet" RENAME TO "walet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
