/*
  Warnings:

  - You are about to drop the column `description` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Department" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "description";
