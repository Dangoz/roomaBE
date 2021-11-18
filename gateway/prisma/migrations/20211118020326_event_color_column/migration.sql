/*
  Warnings:

  - Added the required column `color` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" ADD COLUMN     "color" TEXT NOT NULL;
