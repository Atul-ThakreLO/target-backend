/*
  Warnings:

  - A unique constraint covering the columns `[class_name]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,subject_id]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,subject_id]` on the table `Papers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[school_name]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[subject_name,class_id]` on the table `Subjects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,subject_id]` on the table `TestPaper` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Class_class_name_key" ON "Class"("class_name");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_title_subject_id_key" ON "Notes"("title", "subject_id");

-- CreateIndex
CREATE UNIQUE INDEX "Papers_title_subject_id_key" ON "Papers"("title", "subject_id");

-- CreateIndex
CREATE UNIQUE INDEX "School_school_name_key" ON "School"("school_name");

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_subject_name_class_id_key" ON "Subjects"("subject_name", "class_id");

-- CreateIndex
CREATE UNIQUE INDEX "TestPaper_title_subject_id_key" ON "TestPaper"("title", "subject_id");
