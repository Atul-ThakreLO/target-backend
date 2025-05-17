-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "office_staff_id" TEXT;

-- AlterTable
ALTER TABLE "Papers" ADD COLUMN     "office_staff_id" TEXT;

-- AlterTable
ALTER TABLE "TestPaper" ADD COLUMN     "office_staff_id" TEXT;

-- AlterTable
ALTER TABLE "TestPaperStudents" ADD COLUMN     "total" DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "OfficeStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "OfficeStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPaper" ADD CONSTRAINT "TestPaper_office_staff_id_fkey" FOREIGN KEY ("office_staff_id") REFERENCES "OfficeStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
