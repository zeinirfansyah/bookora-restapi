import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../../helpers/upload";
import { createBookAuthorService } from "../../services/book_author_services/create_book_author.service";
import path from "path";

export const createAuthor = async (req: Request, res: Response): Promise<void> => {
    const { author_name } = req.body
    const author_photo = req.files?.author_photo as UploadedFile

    try {
        let uploadedAuthorPhoto: string | null = null;
        let authorPhotoPath: string | null = null;

        if (author_photo && !Array.isArray(author_photo)) {
            const allowedExtensions = [".png", ".jpg", ".jpeg"];
            const destinationPath = `./public/uploads/author_photos`;

            uploadedAuthorPhoto = await uploadFile(
                author_photo,
                destinationPath,
                allowedExtensions
            );

            authorPhotoPath = `/uploads/author_photos/${path.basename(uploadedAuthorPhoto)}`
        }

        const newAuthor = await createBookAuthorService({
            author_code: `AUT_${new Date().getTime()}`,
            author_name,
            author_photo: authorPhotoPath
        })

        res.status(201).json({
            success: true,
            status: 201,
            message: 'Author created successfully',
            data: newAuthor
        })
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error updating book:', error.message);

            res.status(500).json({
                success: false,
                status: 500,
                message: error.message,
            });
        } else {
            console.error('Unexpected error:', error);

            res.status(500).json({
                success: false,
                status: 500,
                message: 'An unexpected error occurred',
            });
        }
    }
}