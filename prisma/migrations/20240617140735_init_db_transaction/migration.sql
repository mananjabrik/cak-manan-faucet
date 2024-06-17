-- CreateTable
CREATE TABLE "transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "waletAddress" TEXT NOT NULL,
    CONSTRAINT "transaction_waletAddress_fkey" FOREIGN KEY ("waletAddress") REFERENCES "walet" ("wallet") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "walet" (
    "wallet" TEXT NOT NULL,
    "block" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    "value" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "walet_wallet_key" ON "walet"("wallet");
