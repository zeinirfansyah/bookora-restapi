import { Request, Response } from "express";
import { getUserService } from "../../services/user_services/get_user.service";

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const { user_code } = req.params;

    try {
        const user = await getUserService({ user_code });

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