import { Request, Response } from "express";
import { createUserService } from "../services/user.service";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../helpers/upload";

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
        // Panggil service untuk membuat user
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
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Something went wrong',
            error: error
        });
    }
}