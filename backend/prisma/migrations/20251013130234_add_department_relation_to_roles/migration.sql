/*
  Warnings:

  - A unique constraint covering the columns `[name,departmentId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `departmentId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Role_name_key";

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "departmentId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Role_departmentId_idx" ON "Role"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_departmentId_key" ON "Role"("name", "departmentId");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
