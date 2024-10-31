import { createBookRepository, getAllBooksRepository } from "../repositories/book.repository";
import IBookType from "../types/book.types";

export const createBookService = async (payload: Omit<IBookType, 'created_at' | 'updated_at'>): Promise<IBookType> => {
    const bookData: IBookType = {
        ...payload,
        created_at: new Date(),
        updated_at: new Date()
    }

    return await createBookRepository(
        {
            ...bookData
        }
    )
}

export const getAllBooksService = async (
    book_name?: string,
    category_code?: string,
    author_code?: string,
    publisher_code?: string
): Promise<IBookType[] | null> => {
    return await getAllBooksRepository(book_name, category_code, author_code, publisher_code)
}
