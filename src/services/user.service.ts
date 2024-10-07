import path from 'path'
import fs from 'fs'
import { createUserRepository } from "../repositories/user.repository";
import IUserType from "../types/user.types";
import bcrypt from 'bcryptjs'

export const createUserService = async (payload: Omit<IUserType, 'created_at' | 'updated_at'>): Promise<IUserType> => {

    if (payload.profile_image) {
        const existingProfileImage = path.join(
            __dirname,
            `../../public${payload.profile_image}`
        );

        if (fs.existsSync(existingProfileImage)) {
            fs.unlinkSync(existingProfileImage);
        }
    }

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