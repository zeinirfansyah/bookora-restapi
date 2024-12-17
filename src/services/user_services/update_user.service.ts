import { updateUserRepository } from "../../repositories/user_repositories/update_user.repository"
import IUserType from "../../types/user.types"
import bcrypt from 'bcryptjs'

export const updateUserService = async (user_code: string, payload: Partial<IUserType>): Promise<IUserType> => {
    if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10)
    }

    return await updateUserRepository(user_code, payload)
}