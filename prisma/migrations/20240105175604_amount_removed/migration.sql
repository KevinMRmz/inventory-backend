/*
  Warnings:

  - You are about to drop the column `amount` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serial_no]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "amount";

-- CreateIndex
CREATE UNIQUE INDEX "products_serial_no_key" ON "products"("serial_no");
