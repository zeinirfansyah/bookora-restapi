import { NextFunction, Request, Response } from "express";

export const validateBookInput = async (req: Request, res: Response, next: NextFunction) => {

    const bookData = req.body

    const isPatchMethod = req.method === 'PATCH'

    if (!isPatchMethod) {
        const requiredFields = ['book_name']

        const missingFields = requiredFields.filter((field) => !bookData[field])

        if (missingFields.length > 0) {
            res.status(400).send({
                status_code: 400,
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            })
            return
        }
    }

    next()
}