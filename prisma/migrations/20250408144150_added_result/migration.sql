-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "marks" JSONB NOT NULL,
    "total_percent" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
