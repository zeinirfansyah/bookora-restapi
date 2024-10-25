/*
  Warnings:

  - A unique constraint covering the columns `[category_name]` on the table `BookCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publisher_name]` on the table `BookPublisher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `BookCategory_category_name_key` ON `BookCategory`(`category_name`);

-- CreateIndex
CREATE UNIQUE INDEX `BookPublisher_publisher_name_key` ON `BookPublisher`(`publisher_name`);
