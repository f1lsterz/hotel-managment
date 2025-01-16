/*
  Warnings:

  - You are about to drop the column `createdAt` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - The values [MANAGER,STAFF] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `booking_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oauthaccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `booking_services` DROP FOREIGN KEY `booking_services_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `booking_services` DROP FOREIGN KEY `booking_services_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `oauthaccount` DROP FOREIGN KEY `OAuthAccount_userId_fkey`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `discount` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `createdAt`,
    DROP COLUMN `features`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `role` ENUM('ADMIN', 'RECEPTIONIST', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `booking_services`;

-- DropTable
DROP TABLE `oauthaccount`;

-- CreateTable
CREATE TABLE `room_services` (
    `roomId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`roomId`, `serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `room_services` ADD CONSTRAINT `room_services_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_services` ADD CONSTRAINT `room_services_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
