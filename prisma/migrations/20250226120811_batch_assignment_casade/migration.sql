/*
  Warnings:

  - You are about to drop the column `created_at` on the `Papers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[test_id]` on the table `Papers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_id` to the `Papers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batch_id` to the `TestPaper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `TestPaper` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Events_TestPapers" DROP CONSTRAINT "Events_TestPapers_office_staff_id_fkey";

-- DropForeignKey
ALTER TABLE "Events_TestPapers" DROP CONSTRAINT "Events_TestPapers_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Notices" DROP CONSTRAINT "Notices_office_staff_id_fkey";

-- DropForeignKey
ALTER TABLE "OfficeStaffInfo" DROP CONSTRAINT "OfficeStaffInfo_office_staff_id_fkey";

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
ALTER TABLE "TestPaper" DROP CONSTRAINT "TestPaper_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "TestPaperStudents" DROP CONSTRAINT "TestPaperStudents_student_id_fkey";

-- DropForeignKey
ALTER TABLE "TestPaperStudents" DROP CONSTRAINT "TestPaperStudents_test_paper_id_fkey";

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Papers" DROP COLUMN "created_at",
ADD COLUMN     "class_id" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "test_id" TEXT;

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "StudentInfo" ADD COLUMN     "batch_id" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "school_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subjects" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "TestPaper" ADD COLUMN     "batch_id" TEXT NOT NULL,
ADD COLUMN     "class_id" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Batches" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "classId" TEXT NOT NULL,

    CONSTRAINT "Batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BatchesNotes" (
    "note_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,

    CONSTRAINT "BatchesNotes_pkey" PRIMARY KEY ("note_id","batch_id")
);

-- CreateTable
CREATE TABLE "Assignments" (
    "id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,
    "subjects_id" TEXT NOT NULL,
    "batch_id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompletedAssignment" (
    "assi_id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "pdf_url" TEXT NOT NULL,
    "pblic_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompletedAssignment_pkey" PRIMARY KEY ("assi_id","student_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Batches_name_key" ON "Batches"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BatchesNotes_note_id_batch_id_key" ON "BatchesNotes"("note_id", "batch_id");

-- CreateIndex
CREATE UNIQUE INDEX "Papers_test_id_key" ON "Papers"("test_id");

-- AddForeignKey
ALTER TABLE "Subjects" ADD CONSTRAINT "Subjects_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("school_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFeesPaid" ADD CONSTRAINT "StudentFeesPaid_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFeesPaid" ADD CONSTRAINT "StudentFeesPaid_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSubjects" ADD CONSTRAINT "StudentSubjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfficeStaffInfo" ADD CONSTRAINT "OfficeStaffInfo_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "OfficeStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notices" ADD CONSTRAINT "Notices_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "OfficeStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events_TestPapers" ADD CONSTRAINT "Events_TestPapers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events_TestPapers" ADD CONSTRAINT "Events_TestPapers_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "OfficeStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "TestPaper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPaper" ADD CONSTRAINT "TestPaper_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPaper" ADD CONSTRAINT "TestPaper_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPaper" ADD CONSTRAINT "TestPaper_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPaperStudents" ADD CONSTRAINT "TestPaperStudents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPaperStudents" ADD CONSTRAINT "TestPaperStudents_test_paper_id_fkey" FOREIGN KEY ("test_paper_id") REFERENCES "TestPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Batches" ADD CONSTRAINT "Batches_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchesNotes" ADD CONSTRAINT "BatchesNotes_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "Notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BatchesNotes" ADD CONSTRAINT "BatchesNotes_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_subjects_id_fkey" FOREIGN KEY ("subjects_id") REFERENCES "Subjects"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "Batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "OfficeStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedAssignment" ADD CONSTRAINT "CompletedAssignment_assi_id_fkey" FOREIGN KEY ("assi_id") REFERENCES "Assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedAssignment" ADD CONSTRAINT "CompletedAssignment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
