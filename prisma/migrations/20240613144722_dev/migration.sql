-- CreateTable
CREATE TABLE `Restaurants` (
    `restaurantId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `avgPrice` DOUBLE NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `openTime` VARCHAR(191) NOT NULL,
    `totalReviews` INTEGER NOT NULL DEFAULT 0,
    `contact` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,

    PRIMARY KEY (`restaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reviews` (
    `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 0,
    `restaurantId` INTEGER NULL,
    `authorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`reviewId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `userId` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `occupation` VARCHAR(191) NOT NULL DEFAULT 'Food Reviewer',
    `totalReviews` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `categoryName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`categoryName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_likedBy` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_likedBy_AB_unique`(`A`, `B`),
    INDEX `_likedBy_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToRestaurants` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToRestaurants_AB_unique`(`A`, `B`),
    INDEX `_CategoryToRestaurants_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurants`(`restaurantId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_likedBy` ADD CONSTRAINT `_likedBy_A_fkey` FOREIGN KEY (`A`) REFERENCES `Reviews`(`reviewId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_likedBy` ADD CONSTRAINT `_likedBy_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToRestaurants` ADD CONSTRAINT `_CategoryToRestaurants_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`categoryName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToRestaurants` ADD CONSTRAINT `_CategoryToRestaurants_B_fkey` FOREIGN KEY (`B`) REFERENCES `Restaurants`(`restaurantId`) ON DELETE CASCADE ON UPDATE CASCADE;
