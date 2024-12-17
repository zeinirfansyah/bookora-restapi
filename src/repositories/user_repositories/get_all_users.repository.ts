import { Prisma } from "@prisma/client";
import IUserType from "../../types/user.types";
import prisma from "../../config/prisma";

export const getAllUsersRepository = async (payload?: Prisma.UserWhereInput): Promise<IUserType[] | null> => {
    return await prisma.user.findMany({
        where: payload
    });
}