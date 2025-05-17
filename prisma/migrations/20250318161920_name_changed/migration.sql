/*
  Warnings:

  - You are about to drop the column `classId` on the `Batches` table. All the data in the column will be lost.
  - Added the required column `class_id` to the `Batches` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Batches" DROP CONSTRAINT "Batches_classId_fkey";

-- AlterTable
ALTER TABLE "Batches" DROP COLUMN "classId",
ADD COLUMN     "class_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Batches" ADD CONSTRAINT "Batches_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;
