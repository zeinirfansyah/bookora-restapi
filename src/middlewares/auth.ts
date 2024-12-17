import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { getUserService } from '../services/user_services/get_user.service';
import IUserType from '../types/user.types';

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers["authorization"] || "";
        const token = authHeader?.split(" ")[1];

        if (!token) {
            res.status(401).json({
                message: "Must be logged in",
                data: null,
            });
            return;
        }

        const user = jwt.verify(token, process.env.JWT_SECRET as string) as IUserType

        if (!user) {
            res.status(401).json({
                message: "Must be logged in",
                data: null,
            });
            return;
        }

        req.user = user;

        next();

    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                status: 401,
                message: "Invalid token",
                data: null,
            });
            return;
        }
    }
};

export const authorizeRole = (requiredRole: Role) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userPayload = req.user as {
                user_code: string;
                role: Role
            }

            if (!userPayload?.user_code) {
                res.status(401).json({
                    message: "User is not authenticated",
                    data: null,
                });
                return;
            }

            const user = await getUserService({ user_code: userPayload.user_code })

            if (!user) {
                res.status(404).send({
                    message: "User not found",
                    data: null,
                });
                return
            }

            if (user.role !== requiredRole) {
                res.status(403).send({
                    message: "You do not have the required role to access this resource",
                    data: null,
                });
                return
            }

            next();
        } catch (err) {
            res.status(500).json({
                success: false,
                status: 500,
                message: err,
            });
            return
        }
    }
}