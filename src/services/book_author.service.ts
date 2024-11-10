import { Prisma } from "@prisma/client";
import { getAllBookAuthorRepository, getBookAuthorRepository } from "../repositories/book_author.repository";
import IBookAuthorType from "../types/book_author.types";



export const getAllBookAuthorService = async (): Promise<IBookAuthorType[] | null> => {
    return await getAllBookAuthorRepository()
}

export const getBookAuthorService = async (payload: Prisma.BookAuthorWhereUniqueInput): Promise<IBookAuthorType | null> => {
    if (!payload) return null

    return await getBookAuthorRepository(payload)
}