import { Prisma } from "@prisma/client";
import { getBookPublisherRepository } from "../repositories/book_publisher.repository";
import IBookPublisherType from "../types/book_publisher.types";

export const getBookPublisherService = async (payload: Prisma.BookPublisherWhereUniqueInput): Promise<IBookPublisherType | null> => {

    if (!payload) {
        return null
    }

    return await getBookPublisherRepository(payload)
}
