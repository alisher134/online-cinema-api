import { PrismaClient } from '@prisma/client';

import { slugify } from '@/common/utils';

import { genresData } from './data/genres';

const prisma = new PrismaClient();

async function seedGenres() {
  for (const genre of genresData) {
    await prisma.genre.create({
      data: {
        title: genre,
        slug: slugify(genre),
      },
    });
  }
}

async function main() {
  console.log('🌱 Starting seed...');
  await seedGenres();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
