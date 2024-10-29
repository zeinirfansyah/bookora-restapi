import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedAuthor = async () => {
    for (let i = 0; i < 8; i++) {
        const fakeAuthorCode = `AUT_${new Date().getTime()}`;
        const fakeAuthorName: string = faker.person.fullName();

        const bookAuthor = await prisma.bookAuthor.create({
            data: {
                author_code: fakeAuthorCode,
                author_name: fakeAuthorName,
            }
        });

        console.log(`Author ${i + 1} created without a picture:`, bookAuthor);
    }
}
