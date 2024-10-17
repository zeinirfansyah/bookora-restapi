import { Request, Response } from "express";
import { createUserService, deleteUserService, getAllUsersService, getUserService, updateUserService } from "../services/user.service";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../helpers/upload";
import path from "path";
import fs from 'fs'
import { Role } from "@prisma/client";

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
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Something went wrong',
            error: error
        });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { user_code } = req.params;
    const { fullname, username, email, phone, role, password } = req.body;

    const profile_image = req.files?.profile_image as UploadedFile

    try {
        const existingUser = await getUserService(user_code);

        let uploadedProfileImagePath: string | null = existingUser?.profile_image || null;

        if (profile_image && !Array.isArray(profile_image)) {
            const allowedExtensions = [".png", ".jpg", ".jpeg"];
            const destinationPath = `./public/uploads/profile_images`;

            uploadedProfileImagePath = await uploadFile(
                profile_image,
                destinationPath,
                allowedExtensions
            );

            const existingProfileImage = path.join(
                __dirname,
                `../../${existingUser?.profile_image}`
            )

            if (fs.existsSync(existingProfileImage)) {
                fs.unlinkSync(existingProfileImage)
            }
        }

        const payload = {
            fullname,
            username,
            email,
            phone,
            role,
            password,
            profile_image: uploadedProfileImagePath
        };

        const updatedUser = await updateUserService(user_code, payload);

        res.status(200).json({
            success: true,
            status: 200,
            message: 'User updated successfully',
            data: updatedUser
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

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { user_code } = req.params;

    try {
        const user = await getUserService(user_code);

        if (!user) {
            res.status(404).json({
                success: false,
                status: 404,
                message: 'User not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'User fetched successfully',
            data: user
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

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const { role } = req.query

    try {
        if (role && !(role === 'CUSTOMER' || role === 'ADMIN')) {
            res.status(400).json({
                success: false,
                status: 400,
                message: 'Invalid user role.',
            })
            return
        }

        const users = await getAllUsersService(role as Role)

        if (!users || users.length === 0) {
            res.status(400).json({
                success: false,
                status: 400,
                message: 'User not found.',
                data: users
            })
            return
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'User fetched successfully',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Something went wrong',
            error: error
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { user_code } = req.params

    try {

        const user = await getUserService(user_code)

        if (!user) {
            res.status(400).json({
                success: false,
                status: 400,
                message: 'User not found.',
            });
        }

        await deleteUserService(user_code)

        res.status(200).json({
            success: true,
            status: 200,
            message: `User with user code ${user_code} deleted successfully.`,
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