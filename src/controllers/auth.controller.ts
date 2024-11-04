import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserService, getUserService } from "../services/user.service";

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body
    try {

        if (!username || !password) {
            res.status(400).json({
                success: false,
                message: "Username and password are required"
            });
            return;
        }

        const existingUser = await getUserService({ username })


        if (!existingUser) {
            res.status(404).json({
                success: false,
                status: 404,
                message: "You can't login with a nonexistent account."
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                status: 401,
                message: "Invalid password"
            });
            return;
        }

        const token = jwt.sign(
            {
                user_code: existingUser.user_code,
                fullname: existingUser.fullname,
                username: existingUser.username,
                email: existingUser.email,
                phone: existingUser.phone,
                profile_image: existingUser.profile_image,
                role: existingUser.role
            },

            process.env.JWT_SECRET as string,

        )

        res.status(200).json({
            success: true,
            status: 200,
            message: "Login successful",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
        return;
    }
}

export const register = async (req: Request, res: Response): Promise<void> => {
    const { fullname, username, email, phone, password } = req.body

    try {
        const newUser = await createUserService({
            user_code: `USR_${new Date().getTime()}`,
            fullname,
            username,
            email,
            phone,
            password,
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