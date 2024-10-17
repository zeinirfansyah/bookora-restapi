import { Role } from "@prisma/client";
import { createUserRepository, deleteUserRepository, getAllUsersRepository, getUserRepository, updateUserRepository } from "../repositories/user.repository";
import IUserType from "../types/user.types";
import bcrypt from 'bcryptjs'

export const createUserService = async (payload: Omit<IUserType, 'created_at' | 'updated_at'>): Promise<IUserType> => {
    const hashedPassword = await bcrypt.hash(payload.password, 10)

    const userData: IUserType = {
        ...payload,
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date()
    }

    return await createUserRepository(
        {
            ...userData
        }
    )
}

export const updateUserService = async (user_code: string, payload: Partial<IUserType>): Promise<IUserType> => {
    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10)
    }

    return await updateUserRepository(user_code, payload)
}

export const getUserService = async (user_code: string): Promise<IUserType | null> => {

    if (!user_code) {
        return null
    }

    return await getUserRepository(user_code)
}

export const getAllUsersService = async (role: Role): Promise<IUserType[] | null> => {
    return await getAllUsersRepository(role)
}

export const deleteUserService = async (user_code: string) => {
    return await deleteUserRepository(user_code)
}