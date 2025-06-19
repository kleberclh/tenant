/*
  Warnings:

  - You are about to drop the column `admin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_clientId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "admin",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Accounts";

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "debt" DOUBLE PRECISION NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
