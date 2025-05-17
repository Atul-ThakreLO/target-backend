/*
  Warnings:

  - You are about to drop the column `location` on the `JobPostings` table. All the data in the column will be lost.
  - Added the required column `experience` to the `JobPostings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobPostings" DROP COLUMN "location",
ADD COLUMN     "experience" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "JobApplications" (
    "id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "resume_url" TEXT,
    "resume_public_id" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notices" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "posting_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "office_staff_id" TEXT NOT NULL,

    CONSTRAINT "Notices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events_TestPapers" (
    "id" TEXT NOT NULL,
    "subject_id" TEXT,
    "topic" TEXT,
    "totalMarks" INTEGER,
    "duration" TIMESTAMP(3),
    "content" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "office_staff_id" TEXT NOT NULL,

    CONSTRAINT "Events_TestPapers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobApplications" ADD CONSTRAINT "JobApplications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "JobPostings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notices" ADD CONSTRAINT "Notices_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "OfficeStaff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events_TestPapers" ADD CONSTRAINT "Events_TestPapers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("subject_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events_TestPapers" ADD CONSTRAINT "Events_TestPapers_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "OfficeStaff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
