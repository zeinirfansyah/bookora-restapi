import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

async function main() {
    try {
        for (let i = 0; i < 20; i++) {
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
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
