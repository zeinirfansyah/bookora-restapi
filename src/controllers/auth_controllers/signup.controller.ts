import { Request, Response } from "express";
import { createUserService } from "../../services/user_services/create_user.service";

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