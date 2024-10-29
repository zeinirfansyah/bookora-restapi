import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seedPublisher = async () => {
    for (let i = 0; i < 8; i++) {
        const fakePublisherCode = `PUB_${new Date().getTime()}`;
        const fakePublisherName: string = faker.company.name();

        const bookPublisher = await prisma.bookPublisher.create({
            data: {
                publisher_code: fakePublisherCode,
                publisher_name: fakePublisherName,
            }
        });

        console.log(`Publisher ${i + 1} created without a picture:`, bookPublisher);
    }
}
