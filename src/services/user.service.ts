import { createUserRepository, updateUserRepository } from "../repositories/user.repository";
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