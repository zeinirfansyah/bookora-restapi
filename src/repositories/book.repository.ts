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

export const getAllBooksRepository = async (
    book_name?: string,
    category_code?: string,
    author_code?: string,
    publisher_code?: string
): Promise<IBookType[] | null> => {
    return await prisma.book.findMany({
        where: {
            AND: [
                {
                    book_name: {
                        contains: book_name
                    },
                },
                {
                    book_category: {
                        is: {
                            category_code: {
                                search: category_code,
                            },
                        },
                    },
                },
                {
                    book_author: {
                        is: {
                            author_code: {
                                search: author_code,
                            },
                        },
                    },
                },
                {
                    book_publisher: {
                        is: {
                            publisher_code: {
                                search: publisher_code,
                            },
                        },
                    },
                },
            ],
        },
        omit: {
            book_category_id: true,
            book_author_id: true,
            book_publisher_id: true,
        },
        include: {
            book_author: {
                omit: {
                    created_at: true,
                    updated_at: true
                }
            },
            book_category: {
                omit: {
                    created_at: true,
                    updated_at: true
                }
            },
            book_publisher: {
                omit: {
                    created_at: true,
                    updated_at: true
                }
            },
        }
    });
}

