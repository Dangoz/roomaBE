/*
  Warnings:

  - You are about to drop the column `duration` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_schedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endAt` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_schedule" DROP CONSTRAINT "user_schedule_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "user_schedule" DROP CONSTRAINT "user_schedule_userId_fkey";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "duration",
DROP COLUMN "scheduleId",
DROP COLUMN "status",
DROP COLUMN "userId",
ADD COLUMN     "endAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET DEFAULT E'';

-- DropTable
DROP TABLE "schedule";

-- DropTable
DROP TABLE "user_schedule";

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "dayjs" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TaskToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToUser_AB_unique" ON "_TaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToUser_B_index" ON "_TaskToUser"("B");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD FOREIGN KEY ("A") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
