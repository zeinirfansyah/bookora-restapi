import { createBookAuthorRepository } from "../../repositories/book_author_repositories/create_book_author.repository";
import IBookAuthorType from "../../types/book_author.types";

export const createBookAuthorService = async (payload: Omit<IBookAuthorType, 'created_at' | 'updated_at'>): Promise<IBookAuthorType> => {
    const createdBookAuthor: IBookAuthorType = {
        ...payload,
        created_at: new Date(),
        updated_at: new Date()

    }

    return await createBookAuthorRepository(
        {
            ...createdBookAuthor
        }
    )

}