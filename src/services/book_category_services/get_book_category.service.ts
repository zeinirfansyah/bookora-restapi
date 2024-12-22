import { Prisma } from "@prisma/client"
import IBookCategoryType from "../../types/book_category.types"
import { getBookCategoryRepository } from "../../repositories/book_category_repositories/get_book_category.repository"

export const getBookCategoryService = async (payload: Prisma.BookCategoryWhereUniqueInput): Promise<IBookCategoryType | null> => {

    if (!payload) {
        return null
    }

    return await getBookCategoryRepository(payload)
}
