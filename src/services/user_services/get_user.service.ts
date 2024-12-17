import { Prisma } from "@prisma/client"
import IUserType from "../../types/user.types"
import { getUserRepository } from "../../repositories/user_repositories/get_user.repository"

export const getUserService = async (payload: Prisma.UserWhereUniqueInput): Promise<IUserType | null> => {

    if (!payload) {
        return null
    }

    return await getUserRepository(payload)
}