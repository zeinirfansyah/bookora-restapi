import { Prisma } from "@prisma/client"
import IBookPublisherType from "../../types/book_publisher.types"
import prisma from "../../config/prisma"

export const getBookPublisherRepository = async (payload: Prisma.BookPublisherWhereUniqueInput): Promise<IBookPublisherType | null> => {
    const bookPublisher = await prisma.bookPublisher.findUnique({
        where: payload
    })

    return bookPublisher
}

