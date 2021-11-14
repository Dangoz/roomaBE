/*
  Warnings:

  - You are about to drop the column `createdAt` on the `task` table. All the data in the column will be lost.
  - Added the required column `startAt` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "createdAt",
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL;
