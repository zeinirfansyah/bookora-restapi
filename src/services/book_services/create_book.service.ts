import { createBookRepository } from "../../repositories/book_repositories/create_book.repository"
import IBookType from "../../types/book.types"

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
