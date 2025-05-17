/*
  Warnings:

  - You are about to drop the column `resume_cvv` on the `OfficeStaffInfo` table. All the data in the column will be lost.
  - You are about to drop the column `school_id` on the `StudentFeesPaid` table. All the data in the column will be lost.
  - Added the required column `avtar_url` to the `OfficeStaffInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `OfficeStaffInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentFeesPaid" DROP CONSTRAINT "StudentFeesPaid_school_id_fkey";

-- AlterTable
ALTER TABLE "OfficeStaffInfo" DROP COLUMN "resume_cvv",
ADD COLUMN     "avtar_url" TEXT NOT NULL,
ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentFeesPaid" DROP COLUMN "school_id";
