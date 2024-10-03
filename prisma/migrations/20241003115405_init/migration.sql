-- AlterTable
ALTER TABLE `book` ADD COLUMN `bookAuthorId` VARCHAR(191) NULL,
    ADD COLUMN `bookPublisherId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `BookAuthor` (
    `id` VARCHAR(191) NOT NULL,
    `author_code` VARCHAR(191) NOT NULL,
    `author_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BookAuthor_author_code_key`(`author_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookPublisher` (
    `id` VARCHAR(191) NOT NULL,
    `publisher_code` VARCHAR(191) NOT NULL,
    `publisher_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BookPublisher_publisher_code_key`(`publisher_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_bookPublisherId_fkey` FOREIGN KEY (`bookPublisherId`) REFERENCES `BookPublisher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_bookAuthorId_fkey` FOREIGN KEY (`bookAuthorId`) REFERENCES `BookAuthor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
