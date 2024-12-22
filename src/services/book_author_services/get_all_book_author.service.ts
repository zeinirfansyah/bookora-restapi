import { getAllBookAuthorRepository } from "../../repositories/book_author_repositories/get_all_book_author.repository"
import IBookAuthorType from "../../types/book_author.types"

export const getAllBookAuthorService = async (): Promise<IBookAuthorType[] | null> => {
    return await getAllBookAuthorRepository()
}