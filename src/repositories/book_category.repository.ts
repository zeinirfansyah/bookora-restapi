import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import IBookCategoryType from "../types/book_category.types";

export const getBookCategoryRepository = async (payload: Prisma.BookCategoryWhereUniqueInput): Promise<IBookCategoryType | null> => {
    const bookCategory = await prisma.bookCategory.findUnique({
        where: payload
    })

    return bookCategory
}

