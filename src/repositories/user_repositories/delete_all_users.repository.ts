import { Role } from "@prisma/client"
import prisma from "../../config/prisma"

export const deleteAllUsersRepository = async (role: Role) => {
    return await prisma.user.deleteMany({
        where: { role }
    })
}