/*
  Warnings:

  - You are about to drop the column `roomId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_roomId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "roomId",
ADD COLUMN     "roomName" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
