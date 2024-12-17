import { Request, Response } from "express"
import { Role } from "@prisma/client"
import { getAllUsersService } from "../../services/user_services/get-all_users.service"

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

        const userRole = role as Role
        const users = await getAllUsersService({ role: userRole })

        if (!users) {
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