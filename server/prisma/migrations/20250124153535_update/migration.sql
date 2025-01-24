/*
  Warnings:

  - You are about to drop the `discount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room_discounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room_services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `room_discounts` DROP FOREIGN KEY `room_discounts_discountId_fkey`;

-- DropForeignKey
ALTER TABLE `room_discounts` DROP FOREIGN KEY `room_discounts_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `room_services` DROP FOREIGN KEY `room_services_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `room_services` DROP FOREIGN KEY `room_services_serviceId_fkey`;

-- DropTable
DROP TABLE `discount`;

-- DropTable
DROP TABLE `room_discounts`;

-- DropTable
DROP TABLE `room_services`;

-- CreateTable
CREATE TABLE `booking_services` (
    `bookingId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`bookingId`, `serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booking_services` ADD CONSTRAINT `booking_services_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_services` ADD CONSTRAINT `booking_services_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
