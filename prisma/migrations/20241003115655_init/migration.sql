/*
  Warnings:

  - You are about to drop the column `bookAuthorId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `bookPublisherId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_bookAuthorId_fkey`;

-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_bookPublisherId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `bookAuthorId`,
    DROP COLUMN `bookPublisherId`,
    ADD COLUMN `book_author_id` VARCHAR(191) NULL,
    ADD COLUMN `book_publisher_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_book_publisher_id_fkey` FOREIGN KEY (`book_publisher_id`) REFERENCES `BookPublisher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_book_author_id_fkey` FOREIGN KEY (`book_author_id`) REFERENCES `BookAuthor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
