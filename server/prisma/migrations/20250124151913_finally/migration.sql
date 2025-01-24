/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `room` table. All the data in the column will be lost.
  - The values [SUITE] on the enum `Room_type` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `room_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roomId` on the `room_services` table. All the data in the column will be lost.
  - Added the required column `bookingId` to the `room_services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `room_services` DROP FOREIGN KEY `room_services_roomId_fkey`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `isAvailable`,
    MODIFY `type` ENUM('SINGLE', 'DOUBLE', 'DELUXE', 'ECONOMY') NOT NULL;

-- AlterTable
ALTER TABLE `room_services` DROP PRIMARY KEY,
    DROP COLUMN `roomId`,
    ADD COLUMN `bookingId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`bookingId`, `serviceId`);

-- AddForeignKey
ALTER TABLE `room_services` ADD CONSTRAINT `room_services_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
