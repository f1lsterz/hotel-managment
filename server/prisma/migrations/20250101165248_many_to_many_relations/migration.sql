/*
  Warnings:

  - You are about to drop the `_bookingtoservice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_roomdiscounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_bookingtoservice` DROP FOREIGN KEY `_BookingToService_A_fkey`;

-- DropForeignKey
ALTER TABLE `_bookingtoservice` DROP FOREIGN KEY `_BookingToService_B_fkey`;

-- DropForeignKey
ALTER TABLE `_roomdiscounts` DROP FOREIGN KEY `_RoomDiscounts_A_fkey`;

-- DropForeignKey
ALTER TABLE `_roomdiscounts` DROP FOREIGN KEY `_RoomDiscounts_B_fkey`;

-- DropTable
DROP TABLE `_bookingtoservice`;

-- DropTable
DROP TABLE `_roomdiscounts`;

-- CreateTable
CREATE TABLE `RoomDiscount` (
    `roomId` INTEGER NOT NULL,
    `discountId` INTEGER NOT NULL,

    PRIMARY KEY (`roomId`, `discountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookingToService` (
    `bookingId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`bookingId`, `serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomDiscount` ADD CONSTRAINT `RoomDiscount_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomDiscount` ADD CONSTRAINT `RoomDiscount_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingToService` ADD CONSTRAINT `BookingToService_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingToService` ADD CONSTRAINT `BookingToService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
