import { Prisma } from "@prisma/client"
import IUserType from "../../types/user.types"
import prisma from "../../config/prisma"

export const getUserRepository = async (payload: Prisma.UserWhereUniqueInput): Promise<IUserType | null> => {
    const user = await prisma.user.findUnique({
        where: payload
    })

    return user
}