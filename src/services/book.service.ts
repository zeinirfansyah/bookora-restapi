import { Prisma } from "@prisma/client";
import { createBookRepository, getAllBooksRepository } from "../repositories/book.repository";
import IBookType from "../types/book.types";

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

export const getAllBooksService = async (payload?: Prisma.BookWhereInput): Promise<IBookType[] | null> => {
    return await getAllBooksRepository(payload)
}
