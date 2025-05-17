/*
  Warnings:

  - You are about to drop the column `total` on the `TestPaperStudents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestPaper" ADD COLUMN     "totalMarks" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "TestPaperStudents" DROP COLUMN "total";
