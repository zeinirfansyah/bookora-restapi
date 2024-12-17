import prisma from "../../config/prisma"
import IUserType from "../../types/user.types"

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