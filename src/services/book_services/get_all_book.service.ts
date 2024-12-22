import { getAllBooksRepository } from "../../repositories/book_repositories/get_all_book.repository"
import IBookType from "../../types/book.types"

export const getAllBooksService = async (
    book_name?: string,
    category_code?: string,
    author_code?: string,
    publisher_code?: string
): Promise<IBookType[] | null> => {
    return await getAllBooksRepository(book_name, category_code, author_code, publisher_code)
}
