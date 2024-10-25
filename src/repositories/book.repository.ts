import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import IBookType from "../types/book.types";

export const createBookRepository = async (payload: IBookType): Promise<IBookType> => {
    const createdBook = await prisma.book.create({
        data: {
            ...payload
        }
    })

    return {
        ...createdBook,
        book_cover: createdBook.book_cover || null
    }
}

export const getAllBooksRepository = async (payload?: Prisma.BookWhereInput): Promise<IBookType[] | null> => {
    return await prisma.book.findMany({
        where: payload
    });
}

