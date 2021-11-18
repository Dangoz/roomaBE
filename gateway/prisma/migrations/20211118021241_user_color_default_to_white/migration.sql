/*
  Warnings:

  - Made the column `color` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DEFAULT E'white';
