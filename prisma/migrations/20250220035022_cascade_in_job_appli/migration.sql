/*
  Warnings:

  - You are about to drop the column `role` on the `OfficeStaff` table. All the data in the column will be lost.
  - Added the required column `role` to the `OfficeStaffInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobApplications" DROP CONSTRAINT "JobApplications_job_id_fkey";

-- AlterTable
ALTER TABLE "OfficeStaff" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "OfficeStaffInfo" ADD COLUMN     "role" "Role" NOT NULL;

-- AddForeignKey
ALTER TABLE "JobApplications" ADD CONSTRAINT "JobApplications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobPostings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
