-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_roomId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "roomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
