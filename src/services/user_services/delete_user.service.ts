import { deleteUserRepository } from "../../repositories/user_repositories/delete_user.repository"

export const deleteUserService = async (user_code: string) => {
    return await deleteUserRepository(user_code)
}