/*
  Warnings:

  - The primary key for the `Class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `class_id` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `class_name` on the `Class` table. All the data in the column will be lost.
  - The primary key for the `School` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `school_id` on the `School` table. All the data in the column will be lost.
  - You are about to drop the column `school_name` on the `School` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `student_id` on the `Student` table. All the data in the column will be lost.
  - The primary key for the `Subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subject_id` on the `Subjects` table. All the data in the column will be lost.
  - You are about to drop the column `subject_name` on the `Subjects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,class_id]` on the table `Subjects` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Class` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Class` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `School` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `School` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Student` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Subjects` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignments" DROP CONSTRAINT "Assignments_subjects_id_fkey";

-- DropForeignKey
ALTER TABLE "Batches" DROP CONSTRAINT "Batches_classId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedAssignment" DROP CONSTRAINT "CompletedAssignment_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Events_TestPapers" DROP CONSTRAINT "Events_TestPapers_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Papers" DROP CONSTRAINT "Papers_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Papers" DROP CONSTRAINT "Papers_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentFeesPaid" DROP CONSTRAINT "StudentFeesPaid_class_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentFeesPaid" DROP CONSTRAINT "StudentFeesPaid_student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentInfo" DROP CONSTRAINT "StudentInfo_class_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentInfo" DROP CONSTRAINT "StudentInfo_school_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentInfo" DROP CONSTRAINT "StudentInfo_student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentSubjects" DROP CONSTRAINT "StudentSubjects_student_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentSubjects" DROP CONSTRAINT "StudentSubjects_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Subjects" DROP CONSTRAINT "Subjects_class_id_fkey";

-- DropForeignKey
ALTER TABLE "TestPaper" DROP CONSTRAINT "TestPaper_class_id_fkey";

-- DropForeignKey
ALTER TABLE "TestPaper" DROP CONSTRAINT "TestPaper_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "TestPaperStudents" DROP CONSTRAINT "TestPaperStudents_student_id_fkey";

-- DropIndex
DROP INDEX "Class_class_name_key";

-- DropIndex
DROP INDEX "School_school_name_key";

-- DropIndex
DROP INDEX "Subjects_subject_name_class_id_key";

-- AlterTable
ALTER TABLE "Class" DROP CONSTRAINT "Class_pkey",
DROP COLUMN "class_id",
DROP COLUMN "class_name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Class_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "School" DROP CONSTRAINT "School_pkey",
DROP COLUMN "school_id",
DROP COLUMN "school_name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "School_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "student_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Subjects" DROP CONSTRAINT "Subjects_pkey",
DROP COLUMN "subject_id",
DROP COLUMN "subject_name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE UNIQUE INDEX "School_name_key" ON "School"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_name_class_id_key" ON "Subjects"("name", "class_id");

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFeesPaid" ADD CONSTRAINT "StudentFeesPaid_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFeesPaid" ADD CONSTRAINT "StudentFeesPaid_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events_TestPapers" ADD CONSTRAINT "Events_TestPapers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPaper" ADD CONSTRAINT "TestPaper_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPaper" ADD CONSTRAINT "TestPaper_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPaperStudents" ADD CONSTRAINT "TestPaperStudents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batches" ADD CONSTRAINT "Batches_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_subjects_id_fkey" FOREIGN KEY ("subjects_id") REFERENCES "Subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedAssignment" ADD CONSTRAINT "CompletedAssignment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
