/*
  Warnings:

  - You are about to drop the column `pblic_id` on the `CompletedAssignment` table. All the data in the column will be lost.
  - Added the required column `pdf_url` to the `Assignments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `Assignments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Assignments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `CompletedAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignments" ADD COLUMN     "pdf_url" TEXT NOT NULL,
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CompletedAssignment" DROP COLUMN "pblic_id",
ADD COLUMN     "public_id" TEXT NOT NULL;
