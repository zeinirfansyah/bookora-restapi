import { Prisma } from "@prisma/client"
import prisma from "../../config/prisma"
import IBookAuthorType from "../../types/book_author.types"

export const getBookAuthorRepository = async (payload: Prisma.BookAuthorWhereUniqueInput): Promise<IBookAuthorType | null> => {
    const bookAuthor = await prisma.bookAuthor.findUnique({ where: payload })

    return bookAuthor
}