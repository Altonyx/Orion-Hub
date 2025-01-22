/*
  Warnings:

  - You are about to drop the column `description` on the `Module` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier]` on the table `Module` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedTime` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moduleType` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "description",
ADD COLUMN     "history" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "identifier" TEXT NOT NULL,
ADD COLUMN     "modifiedTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "moduleType" TEXT NOT NULL,
ADD COLUMN     "prodEnvStatus" TEXT NOT NULL DEFAULT 'Not Deployed',
ADD COLUMN     "testEnvStatus" TEXT NOT NULL DEFAULT 'Not Deployed';

-- CreateIndex
CREATE UNIQUE INDEX "Module_identifier_key" ON "Module"("identifier");
