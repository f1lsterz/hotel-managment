-- AlterTable
ALTER TABLE `report` MODIFY `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `room` MODIFY `isAvailable` BOOLEAN NULL DEFAULT true,
    MODIFY `features` JSON NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'MANAGER', 'STAFF', 'USER', 'GUEST') NULL DEFAULT 'USER';
