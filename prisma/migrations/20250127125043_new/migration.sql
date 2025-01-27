/*
  Warnings:

  - A unique constraint covering the columns `[server,word]` on the table `Dictionary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dictionary_server_word_key" ON "Dictionary"("server", "word");
