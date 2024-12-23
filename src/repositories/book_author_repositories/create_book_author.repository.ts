import prisma from "../../config/prisma";
import IBookAuthorType from "../../types/book_author.types";

export const createBookAuthorRepository = async (payload: IBookAuthorType): Promise<IBookAuthorType> => {
    const createdBookAuthor = await prisma.bookAuthor.create({
        data: {
            ...payload
        }
    })

    return {
        ...createdBookAuthor,
        author_photo: createdBookAuthor.author_photo || null
    }
}