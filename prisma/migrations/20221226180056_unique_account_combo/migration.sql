/*
  Warnings:

  - A unique constraint covering the columns `[userId,id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_id_key" ON "Account"("userId", "id");
