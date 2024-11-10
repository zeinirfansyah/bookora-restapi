import { Request, Response } from "express";
import { getAllBookAuthorService } from "../services/book_author.service";

export const getAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
        const authors = await getAllBookAuthorService()

        if (!authors) {
            res.status(400).json({
                success: false,
                status: 400,
                message: 'Author not found.',
                data: authors
            })
            return
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Author fetched successfully',
            count: authors?.length,
            data: authors
        })
        return
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: error,
        });
        return
    }
}