/*
  Warnings:

  - You are about to drop the column `dayjs` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "dayjs",
ADD COLUMN     "days" INTEGER[];
