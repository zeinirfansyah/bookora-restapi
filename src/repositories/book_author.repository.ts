import { Prisma } from "@prisma/client";
import IBookAuthorType from "../types/book_author.types"
import prisma from "../config/prisma";

export const getBookAuthorRepository = async (payload: Prisma.BookAuthorWhereUniqueInput): Promise<IBookAuthorType | null> => {
    const bookAuthor = await prisma.bookAuthor.findUnique({ where: payload })

    return bookAuthor
}