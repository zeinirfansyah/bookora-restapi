import { PrismaClient } from '@prisma/client';
import { seedCategory } from './seeds/book_category.seed';
import { seedAuthor } from './seeds/book_author.seed';
import { seedPublisher } from './seeds/book_publisher.seed';
import { seedUser } from './seeds/user.seed';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Seeding User...")
        await seedUser()
        console.log("Seeding User Completed")
        console.log("Seeding Book Category...")
        await seedCategory()
        console.log("Seeding Book Category Completed")
        console.log("Seeding Book Author...")
        await seedAuthor()
        console.log("Seeding Book Author Completed")
        await seedPublisher()
        console.log("Seeding Book Publisher Completed")

    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((e) => {
    console.error(e);
    prisma.$disconnect();
});
