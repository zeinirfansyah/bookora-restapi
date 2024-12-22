import { Request, Response } from "express";
import { getBookAuthorRepository } from "../../repositories/book_author_repositories/get_book_author.repository";
import { getBookCategoryService } from "../../services/book_category_services/get_book_category.service";
import { getBookPublisherService } from "../../services/book_publisher_services/get_book_publisher.service";
import { getAllBooksService } from "../../services/book_services/get_all_book.service";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const { book_name, category_code, author_code, publisher_code } = req.query

    try {
        if (category_code) {
            const category = await getBookCategoryService({ category_code: category_code?.toString() })

            if (!category) {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: `Category with code '${category_code}' does not exist.`,
                });
                return;
            }
        }

        if (publisher_code) {
            const publisher = await getBookPublisherService({ publisher_code: publisher_code?.toString() })

            if (!publisher) {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: `Publisher with code '${publisher_code}' does not exist.`,
                });
                return;
            }
        }

        if (author_code) {
            const author = await getBookAuthorRepository({ author_code: author_code?.toString() })

            if (!author) {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: `Author with code '${author_code}' does not exist.`,
                });
                return;
            }
        }

        const books = await getAllBooksService(
            book_name?.toString(),
            category_code?.toString(),
            author_code?.toString(),
            publisher_code?.toString()
        )

        if (!books) {
            res.status(400).json({
                success: false,
                status: 400,
                message: 'User not found.',
                data: books
            })
            return
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Book fetched successfully',
            count: books?.length,
            data: books
        })
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