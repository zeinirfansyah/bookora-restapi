import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import IBookPublisherType from "../types/book_publisher.types";

export const getBookPublisherRepository = async (payload: Prisma.BookPublisherWhereUniqueInput): Promise<IBookPublisherType | null> => {
    const bookPublisher = await prisma.bookPublisher.findUnique({
        where: payload
    })

    return bookPublisher
}

