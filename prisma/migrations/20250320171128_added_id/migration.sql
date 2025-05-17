/*
  Warnings:

  - The primary key for the `BatchesNotes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CompletedAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StudentSubjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TestPaperStudents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[assi_id,student_id]` on the table `CompletedAssignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[student_id,test_paper_id]` on the table `TestPaperStudents` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `BatchesNotes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `CompletedAssignment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `StudentSubjects` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `TestPaperStudents` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "BatchesNotes" DROP CONSTRAINT "BatchesNotes_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "BatchesNotes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CompletedAssignment" DROP CONSTRAINT "CompletedAssignment_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CompletedAssignment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StudentSubjects" DROP CONSTRAINT "StudentSubjects_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "StudentSubjects_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TestPaperStudents" DROP CONSTRAINT "TestPaperStudents_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TestPaperStudents_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "CompletedAssignment_assi_id_student_id_key" ON "CompletedAssignment"("assi_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "TestPaperStudents_student_id_test_paper_id_key" ON "TestPaperStudents"("student_id", "test_paper_id");
