import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const seedCategory = async () => {
    const categories = ['Science', 'Math', 'History', 'Finance']
    for (const category of categories) {

        const fakeCategoryCode = `CAT_${new Date().getTime()}`;
        const bookCategory = await prisma.bookCategory.create({
            data: {
                category_code: fakeCategoryCode,
                category_name: category,
            }
        });

        console.log(`Category ${category} created without a picture:`, bookCategory);
    }
}
