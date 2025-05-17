-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TEACHER', 'MANAGEMENT');

-- CreateTable
CREATE TABLE "JobPostings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "description" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobPostings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficeStaff" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "OfficeStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfficeStaffInfo" (
    "id" TEXT NOT NULL,
    "office_staff_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "subjects" TEXT,
    "qualification" TEXT NOT NULL,
    "resume_cvv" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "hire_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfficeStaffInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OfficeStaff_email_key" ON "OfficeStaff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OfficeStaffInfo_office_staff_id_key" ON "OfficeStaffInfo"("office_staff_id");

-- AddForeignKey
ALTER TABLE "OfficeStaffInfo" ADD CONSTRAINT "OfficeStaffInfo_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "OfficeStaff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
