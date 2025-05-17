/*
  Warnings:

  - You are about to drop the column `subjects_id` on the `Assignments` table. All the data in the column will be lost.
  - Added the required column `subject_id` to the `Assignments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_subjects_id_fkey";

-- AlterTable
ALTER TABLE "Assignments" DROP COLUMN "subjects_id",
ADD COLUMN     "subject_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
