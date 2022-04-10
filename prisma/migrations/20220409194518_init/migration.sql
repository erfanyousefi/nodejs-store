/*
  Warnings:

  - You are about to alter the column `title` on the `blog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(150)`.
  - You are about to alter the column `short_text` on the `blog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - Added the required column `category_id` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog" ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(150),
ALTER COLUMN "short_text" SET DATA TYPE VARCHAR(300);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
