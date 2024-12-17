import { Request, Response } from "express"
import path from "path";
import fs from 'fs'
import { Role } from "@prisma/client";
import { getAllUsersService } from "../../services/user_services/get-all_users.service";
import { deleteAllUsersService } from "../../services/user_services/delete_all_users.service";

export const deleteUsers = async (req: Request, res: Response) => {
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

        console.log(`Users: ${users}`)

        if (!users || users.length === 0) {
            res.status(400).json({
                success: false,
                status: 400,
                message: 'Users not found.',
            });
            return
        }

        for (const user of users) {
            if (user?.profile_image) {
                const profile_image_path = path.join(__dirname, `../../${user.profile_image}`);

                try {
                    fs.unlinkSync(profile_image_path);
                } catch (error) {
                    res.status(500).json({
                        success: false,
                        status: 500,
                        message: 'Error deleting profile_image.',
                        error: error
                    });
                    return
                }
            }
        }

        await deleteAllUsersService(role as Role)

        res.status(200).json({
            success: true,
            status: 200,
            message: `All users deleted successfully.`,
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