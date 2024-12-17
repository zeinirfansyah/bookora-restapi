import prisma from "../../config/prisma"

export const deleteUserRepository = async (user_code: string) => {
    return await prisma.user.delete({
        where: { user_code }
    })
}