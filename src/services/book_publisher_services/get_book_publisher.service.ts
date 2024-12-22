import { Prisma } from "@prisma/client"
import IBookPublisherType from "../../types/book_publisher.types"
import { getBookPublisherRepository } from "../../repositories/book_publisher_repositories/get_book_publisher.repository"

export const getBookPublisherService = async (payload: Prisma.BookPublisherWhereUniqueInput): Promise<IBookPublisherType | null> => {

    if (!payload) {
        return null
    }

    return await getBookPublisherRepository(payload)
}
