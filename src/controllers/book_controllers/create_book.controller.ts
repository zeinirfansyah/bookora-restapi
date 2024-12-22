import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { uploadFile } from "../../helpers/upload";
import { createBookService } from "../../services/book_services/create_book.service";
import { getBookCategoryService } from "../../services/book_category_services/get_book_category.service";
import { getBookPublisherService } from "../../services/book_publisher_services/get_book_publisher.service";
import { getBookAuthorRepository } from "../../repositories/book_author_repositories/get_book_author.repository";

export const createBook = async (req: Request, res: Response): Promise<void> => {
    const {
        book_name,
        category_code,
        publisher_code,
        author_code,
    } = req.body;

    const book_cover = req.files?.book_cover as UploadedFile

    try {
        let uploadedBookCover: string | null = null;
        let bookCoverPath: string | null = null;

        if (book_cover && !Array.isArray(book_cover)) {
            const allowedExtensions = [".png", ".jpg", ".jpeg"];
            const destinationPath = `./public/uploads/book_covers`;

            uploadedBookCover = await uploadFile(
                book_cover,
                destinationPath,
                allowedExtensions
            );

            bookCoverPath = `/uploads/book_covers/${path.basename(uploadedBookCover)}`
        }


        let book_category_id
        let book_publisher_id
        let book_author_id

        if (category_code) {
            const category = await getBookCategoryService({ category_code: category_code })

            if (!category) {
                res.status(400).json({
                    success: false,
                    status: 400,
                    message: `Category with code '${category_code}' does not exist.`,
                });
                return;
            }

            book_category_id = category?.id || null
        }

        if (publisher_code) {
            const publisher = await getBookPublisherService({ publisher_code: publisher_code })

            if (!publisher) {
                res.status(400).json({
                    success: false,
                    status: 400,
                    message: `Publisher with code '${publisher_code}' does not exist.`,
                });
                return;
            }

            book_publisher_id = publisher?.id || null
        }

        if (author_code) {
            const author = await getBookAuthorRepository({ author_code: author_code })

            if (!author) {
                res.status(400).json({
                    success: false,
                    status: 400,
                    message: `Author with code '${author_code}' does not exist.`,
                });
                return;
            }

            book_author_id = author?.id || null
        }


        const newBook = await createBookService({
            book_code: `USR_${new Date().getTime()}`,
            book_name,
            book_category_id,
            book_publisher_id,
            book_author_id,
            book_cover: bookCoverPath
        });

        res.status(201).json({
            success: true,
            status: 201,
            message: 'Book created successfully',
            data: newBook
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error updating book:', error.message);

            res.status(500).json({
                success: false,
                status: 500,
                message: error.message,
            });
        } else {
            console.error('Unexpected error:', error);

            res.status(500).json({
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
            });
        }
    }
}
