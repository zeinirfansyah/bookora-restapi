-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_book_category_id_fkey`;

-- AlterTable
ALTER TABLE `book` MODIFY `book_category_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_book_category_id_fkey` FOREIGN KEY (`book_category_id`) REFERENCES `BookCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
