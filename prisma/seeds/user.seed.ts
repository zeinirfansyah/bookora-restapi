import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

export const seedUser = async () => {
    for (let i = 0; i < 8; i++) {
        const fakeUserName: string = faker.internet.userName();
        const fakeFullName: string = faker.person.fullName();
        const fakeUserEmail: string = faker.internet.email();
        const fakeUserCode = `USR_${new Date().getTime()}`;

        const hashedPassword = await bcrypt.hash("Admin#1", 10)

        const user = await prisma.user.create({
            data: {
                user_code: fakeUserCode,
                username: fakeUserName,
                fullname: fakeFullName,
                email: fakeUserEmail,
                password: hashedPassword,
            }
        });

        console.log(`User ${i + 1} created without a picture:`, user);
    }
}
