import { Request, Response } from "express";
import { getBookCategoryService } from "../services/book_category.service";
import { createBookService, getAllBooksService } from "../services/book.service";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../helpers/upload";

export const createBook = async (req: Request, res: Response): Promise<void> => {
    const {
        book_name,
        book_category,
        // book_publisher,
        // book_author,
    } = req.body;

    const book_cover = req.files?.book_cover as UploadedFile

    try {
        let uploadedBookCover: string | null = null;

        if (book_cover && !Array.isArray(book_cover)) {
            const allowedExtensions = [".png", ".jpg", ".jpeg"];
            const destinationPath = `./public/uploads/book_covers`;

            uploadedBookCover = await uploadFile(
                book_cover,
                destinationPath,
                allowedExtensions
            );
        }

        let book_category_id
        // let book_publisher_id
        // let book_author_id

        if (book_category) {
            const category = await getBookCategoryService({ category_name: book_category })

            if (!category) {
                res.status(400).json({
                    success: false,
                    status: 400,
                    message: `Category '${book_category}' does not exist.`,
                });
                return;
            }

            book_category_id = category?.id || null
        }


        const newBook = await createBookService({
            book_code: `USR_${new Date().getTime()}`,
            book_name,
            book_category_id,
            // book_publisher_id,
            // book_author_id,
            book_cover: uploadedBookCover
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

export const getBooks = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.query

    try {
        let bookCategoryId

        if (category) {
            const bookCategory = category as string
            const categoryData = await getBookCategoryService({ category_name: bookCategory })


            console.log(categoryData)

            if (!categoryData) {
                res.status(400).json({
                    success: false,
                    status: 400,
                    message: 'Book category not found.',
                })
                return
            }

            bookCategoryId = categoryData.id
        }

        const books = await getAllBooksService({ book_category_id: bookCategoryId })

        if (!books || books.length === 0) {
            res.status(400).json({
                success: false,
                status: 400,
                message: 'Book not found.',
                data: books
            })
            return
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Book fetched successfully',
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