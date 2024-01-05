/*
  Warnings:

  - A unique constraint covering the columns `[category_name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_name` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "category_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_category_name_key" ON "categories"("category_name");
