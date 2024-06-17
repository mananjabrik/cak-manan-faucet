/*
  Warnings:

  - You are about to drop the column `wallet` on the `walet` table. All the data in the column will be lost.
  - Added the required column `walletAddress` to the `walet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "waletAddress" TEXT NOT NULL,
    CONSTRAINT "transaction_waletAddress_fkey" FOREIGN KEY ("waletAddress") REFERENCES "walet" ("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("id", "waletAddress") SELECT "id", "waletAddress" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
CREATE TABLE "new_walet" (
    "walletAddress" TEXT NOT NULL,
    "block" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    "value" BIGINT NOT NULL
);
INSERT INTO "new_walet" ("block", "hash", "status", "timeStamp", "value") SELECT "block", "hash", "status", "timeStamp", "value" FROM "walet";
DROP TABLE "walet";
ALTER TABLE "new_walet" RENAME TO "walet";
CREATE UNIQUE INDEX "walet_walletAddress_key" ON "walet"("walletAddress");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
