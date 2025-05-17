-- DropForeignKey
ALTER TABLE "Papers" DROP CONSTRAINT "Papers_test_id_fkey";

-- AddForeignKey
ALTER TABLE "Papers" ADD CONSTRAINT "Papers_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "TestPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;
