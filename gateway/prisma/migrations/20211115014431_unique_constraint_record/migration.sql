/*
  Warnings:

  - A unique constraint covering the columns `[taskId,userId,date]` on the table `record` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "record_taskId_userId_date_key" ON "record"("taskId", "userId", "date");
