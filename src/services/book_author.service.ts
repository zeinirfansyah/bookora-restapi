import { Prisma } from "@prisma/client";
import { getBookAuthorRepository } from "../repositories/book_author.repository";
import IBookAuthorType from "../types/book_author.types";


export const getBookAuthorService = async (payload: Prisma.BookAuthorWhereUniqueInput): Promise<IBookAuthorType | null> => {
    if (!payload) return null

    return await getBookAuthorRepository(payload)
}