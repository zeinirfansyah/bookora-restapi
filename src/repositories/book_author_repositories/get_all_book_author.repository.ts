import prisma from "../../config/prisma"
import IBookAuthorType from "../../types/book_author.types"

export const getAllBookAuthorRepository = async (): Promise<IBookAuthorType[] | null> => {
    const bookAuthors = await prisma.bookAuthor.findMany()

    return bookAuthors
}