/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `Enum(EnumId(7))`.
  - You are about to drop the `bookingtoservice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roomdiscount` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roomId,checkIn,checkOut]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider,providerId]` on the table `OAuthAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,roomId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- DropForeignKey
ALTER TABLE `bookingtoservice` DROP FOREIGN KEY `BookingToService_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `bookingtoservice` DROP FOREIGN KEY `BookingToService_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `oauthaccount` DROP FOREIGN KEY `OAuthAccount_userId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_bookingId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropForeignKey
ALTER TABLE `roomdiscount` DROP FOREIGN KEY `RoomDiscount_discountId_fkey`;

-- DropForeignKey
ALTER TABLE `roomdiscount` DROP FOREIGN KEY `RoomDiscount_roomId_fkey`;

-- DropIndex
DROP INDEX `Booking_roomId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `OAuthAccount_userId_fkey` ON `oauthaccount`;

-- DropIndex
DROP INDEX `Payment_userId_fkey` ON `payment`;

-- DropIndex
DROP INDEX `Review_userId_fkey` ON `review`;

-- AlterTable
ALTER TABLE `booking` MODIFY `totalAmount` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `notification` MODIFY `type` ENUM('BOOKING', 'PAYMENT', 'GENERAL') NOT NULL DEFAULT 'GENERAL';

-- AlterTable
ALTER TABLE `payment` MODIFY `amount` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `method` ENUM('CREDIT_CARD', 'PAYPAL', 'STRIPE') NOT NULL DEFAULT 'CREDIT_CARD';

-- AlterTable
ALTER TABLE `report` MODIFY `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `room` MODIFY `price` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `isAvailable` BOOLEAN NULL DEFAULT true,
    MODIFY `features` JSON NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `photoUrl` VARCHAR(191) NULL,
    MODIFY `role` ENUM('ADMIN', 'MANAGER', 'STAFF', 'USER') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `bookingtoservice`;

-- DropTable
DROP TABLE `roomdiscount`;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_discounts` (
    `roomId` INTEGER NOT NULL,
    `discountId` INTEGER NOT NULL,

    PRIMARY KEY (`roomId`, `discountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_services` (
    `bookingId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,

    PRIMARY KEY (`bookingId`, `serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Booking_roomId_status_idx` ON `Booking`(`roomId`, `status`);

-- CreateIndex
CREATE INDEX `Booking_checkIn_checkOut_idx` ON `Booking`(`checkIn`, `checkOut`);

-- CreateIndex
CREATE UNIQUE INDEX `Booking_roomId_checkIn_checkOut_key` ON `Booking`(`roomId`, `checkIn`, `checkOut`);

-- CreateIndex
CREATE INDEX `Discount_isActive_idx` ON `Discount`(`isActive`);

-- CreateIndex
CREATE INDEX `Discount_startDate_endDate_idx` ON `Discount`(`startDate`, `endDate`);

-- CreateIndex
CREATE INDEX `Notification_userId_isRead_idx` ON `Notification`(`userId`, `isRead`);

-- CreateIndex
CREATE INDEX `OAuthAccount_provider_providerId_idx` ON `OAuthAccount`(`provider`, `providerId`);

-- CreateIndex
CREATE UNIQUE INDEX `OAuthAccount_provider_providerId_key` ON `OAuthAccount`(`provider`, `providerId`);

-- CreateIndex
CREATE INDEX `Review_rating_idx` ON `Review`(`rating`);

-- CreateIndex
CREATE UNIQUE INDEX `Review_userId_roomId_key` ON `Review`(`userId`, `roomId`);

-- CreateIndex
CREATE INDEX `Room_type_status_idx` ON `Room`(`type`, `status`);

-- CreateIndex
CREATE INDEX `Service_name_idx` ON `Service`(`name`);

-- CreateIndex
CREATE INDEX `User_role_idx` ON `User`(`role`);

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_discounts` ADD CONSTRAINT `room_discounts_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_discounts` ADD CONSTRAINT `room_discounts_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_services` ADD CONSTRAINT `booking_services_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_services` ADD CONSTRAINT `booking_services_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OAuthAccount` ADD CONSTRAINT `OAuthAccount_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `booking` RENAME INDEX `Booking_userId_fkey` TO `Booking_userId_idx`;

-- RenameIndex
ALTER TABLE `review` RENAME INDEX `Review_roomId_fkey` TO `Review_roomId_idx`;
