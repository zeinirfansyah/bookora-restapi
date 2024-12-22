import { Prisma } from "@prisma/client"
import IBookAuthorType from "../../types/book_author.types"
import { getBookAuthorRepository } from "../../repositories/book_author_repositories/get_book_author.repository"

export const getBookAuthorService = async (payload: Prisma.BookAuthorWhereUniqueInput): Promise<IBookAuthorType | null> => {
    if (!payload) return null

    return await getBookAuthorRepository(payload)
}