/*
  Warnings:

  - You are about to drop the `_TaskToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TaskToUser" DROP CONSTRAINT "_TaskToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskToUser" DROP CONSTRAINT "_TaskToUser_B_fkey";

-- DropTable
DROP TABLE "_TaskToUser";

-- CreateTable
CREATE TABLE "user_task" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "user_task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_task" ADD CONSTRAINT "user_task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_task" ADD CONSTRAINT "user_task_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
