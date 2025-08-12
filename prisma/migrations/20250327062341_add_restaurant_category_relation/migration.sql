/*
  Warnings:

  - You are about to drop the `_CategoryToRestaurants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CategoryToRestaurants` DROP FOREIGN KEY `_CategoryToRestaurants_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToRestaurants` DROP FOREIGN KEY `_CategoryToRestaurants_B_fkey`;

-- AlterTable
ALTER TABLE `Reviews` MODIFY `body` VARCHAR(1000) NOT NULL;

-- DropTable
DROP TABLE `_CategoryToRestaurants`;

-- CreateTable
CREATE TABLE `RestaurantCategory` (
    `restaurantId` INTEGER NOT NULL,
    `categoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`restaurantId`, `categoryName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RestaurantCategory` ADD CONSTRAINT `RestaurantCategory_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurants`(`restaurantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantCategory` ADD CONSTRAINT `RestaurantCategory_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`categoryName`) ON DELETE RESTRICT ON UPDATE CASCADE;
