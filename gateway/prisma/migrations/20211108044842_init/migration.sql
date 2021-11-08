/*
  Warnings:

  - You are about to drop the column `roomName` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_roomName_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "roomName",
ADD COLUMN     "roomId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
