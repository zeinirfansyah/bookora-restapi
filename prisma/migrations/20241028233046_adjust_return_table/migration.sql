/*
  Warnings:

  - You are about to drop the `return` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `return` DROP FOREIGN KEY `Return_loan_id_fkey`;

-- DropIndex
DROP INDEX `BookPublisher_publisher_name_key` ON `bookpublisher`;

-- DropTable
DROP TABLE `return`;

-- CreateTable
CREATE TABLE `BookReturn` (
    `id` VARCHAR(191) NOT NULL,
    `loan_id` VARCHAR(191) NOT NULL,
    `return_code` VARCHAR(191) NOT NULL,
    `return_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BookReturn_return_code_key`(`return_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookReturn` ADD CONSTRAINT `BookReturn_loan_id_fkey` FOREIGN KEY (`loan_id`) REFERENCES `Loan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
