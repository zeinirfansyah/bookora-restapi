import { Request, Response } from "express";
import { uploadFile } from "../../helpers/upload";
import { UploadedFile } from "express-fileupload";
import { createUserService } from "../../services/user_services/create_user.service";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const {
        fullname,
        username,
        email,
        phone,
        role,
        password
    } = req.body;

    const profile_image = req.files?.profile_image as UploadedFile

    try {
        let uploadedProfileImagePath: string | null = null;

        if (profile_image && !Array.isArray(profile_image)) {
            const allowedExtensions = [".png", ".jpg", ".jpeg"];
            const destinationPath = `./public/uploads/profile_images`;

            uploadedProfileImagePath = await uploadFile(
                profile_image,
                destinationPath,
                allowedExtensions
            );
        }

        const newUser = await createUserService({
            user_code: `USR_${new Date().getTime()}`,
            fullname,
            username,
            email,
            phone,
            role,
            password,
            profile_image: uploadedProfileImagePath
        });

        res.status(201).json({
            success: true,
            status: 201,
            message: 'User created successfully',
            data: newUser
        });

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error updating user:', error.message);

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