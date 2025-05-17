/*
  Warnings:

  - Added the required column `avtar_url` to the `StudentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `StudentInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentInfo" ADD COLUMN     "avtar_url" TEXT NOT NULL,
ADD COLUMN     "public_id" TEXT NOT NULL;
