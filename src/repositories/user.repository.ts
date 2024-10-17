import { Role } from "@prisma/client";
import prisma from "../config/prisma";
import IUserType from "../types/user.types";

export const createUserRepository = async (payload: IUserType): Promise<IUserType> => {
    const createdUser = await prisma.user.create({
        data: {
            ...payload
        }
    })

    return {
        ...createdUser,
        phone: createdUser.phone || null,
        profile_image: createdUser.profile_image || null
    }
}

export const updateUserRepository = async (user_code: string, payload: Partial<IUserType>): Promise<IUserType> => {
    const updatedUser = await prisma.user.update({
        where: { user_code },
        data: {
            ...payload
        }
    })

    return {
        ...updatedUser,
        phone: updatedUser.phone || null,
        profile_image: updatedUser.profile_image || null
    }
}

export const getUserRepository = async (user_code: string): Promise<IUserType | null> => {
    const user = await prisma.user.findUnique({
        where: { user_code }
    })

    return user
}

export const getAllUsersRepository = async (role: Role): Promise<IUserType[] | null> => {
    return await prisma.user.findMany({
        where: { role }
    });
}

export const deleteUserRepository = async (user_code: string) => {
    return await prisma.user.delete({
        where: { user_code }
    })
}