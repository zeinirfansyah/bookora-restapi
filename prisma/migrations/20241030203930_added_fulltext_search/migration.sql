-- CreateIndex
CREATE FULLTEXT INDEX `Book_book_name_idx` ON `Book`(`book_name`);

-- CreateIndex
CREATE FULLTEXT INDEX `BookAuthor_author_name_idx` ON `BookAuthor`(`author_name`);

-- CreateIndex
CREATE FULLTEXT INDEX `BookCategory_category_name_idx` ON `BookCategory`(`category_name`);

-- CreateIndex
CREATE FULLTEXT INDEX `BookPublisher_publisher_name_idx` ON `BookPublisher`(`publisher_name`);
