/*
  Warnings:

  - You are about to drop the column `bookedVisits` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `favResidenciesID` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `residency` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buyProperty` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favPropertyID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `bookedVisits`,
    DROP COLUMN `favResidenciesID`,
    ADD COLUMN `buyProperty` JSON NOT NULL,
    ADD COLUMN `favPropertyID` JSON NOT NULL;

-- DropTable
DROP TABLE `residency`;

-- CreateTable
CREATE TABLE `Property` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `property_type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
