import { Prisma } from "@prisma/client"
import IUserType from "../../types/user.types"
import { getAllUsersRepository } from "../../repositories/user_repositories/get_all_users.repository"

export const getAllUsersService = async (payload?: Prisma.UserWhereInput): Promise<IUserType[] | null> => {
    return await getAllUsersRepository(payload)
}
