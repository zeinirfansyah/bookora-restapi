import { Role } from "@prisma/client"
import { deleteAllUsersRepository } from "../../repositories/user_repositories/delete_all_users.repository"

export const deleteAllUsersService = async (role: Role) => {
    return await deleteAllUsersRepository(role)
}