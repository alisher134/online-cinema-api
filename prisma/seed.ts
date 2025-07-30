import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

import { slugify } from '@/common/utils';

import { actorsData } from './data/actors';
import { categoriesData } from './data/categories';
import { genresData } from './data/genres';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function seedActors() {
  for (const actor of actorsData) {
    try {
      const uploadResult = await cloudinary.uploader.upload(actor.photoUrl, { folder: 'actors' });

      await prisma.actor.upsert({
        where: { slug: slugify(actor.name) },
        update: {
          bio: actor.bio,
          birthDate: actor.birthDate,
          country: actor.country,
          photoUrl: uploadResult.secure_url,
        },
        create: {
          name: actor.name,
          slug: slugify(actor.name),
          bio: actor.bio,
          birthDate: actor.birthDate,
          country: actor.country,
          photoUrl: uploadResult.secure_url,
        },
      });

      console.log(`✅ Actor seeded: ${actor.name}`);
    } catch (error) {
      console.warn(`❌ Failed to seed actor: ${actor.name}`, error);
    }
  }
}

async function seedGenres() {
  for (const genre of genresData) {
    try {
      await prisma.genre.upsert({
        where: { slug: slugify(genre) },
        update: {},
        create: {
          title: genre,
          slug: slugify(genre),
        },
      });

      console.log(`✅ Genre seeded: ${genre}`);
    } catch (error) {
      console.warn(`❌ Failed to seed genre: ${genre}`, error);
    }
  }
}

async function seedCategories() {
  for (const category of categoriesData) {
    try {
      await prisma.category.upsert({
        where: { slug: slugify(category) },
        update: {},
        create: {
          title: category,
          slug: slugify(category),
        },
      });

      console.log(`✅ Category seeded: ${category}`);
    } catch (error) {
      console.warn(`❌ Failed to seed category: ${category}`, error);
    }
  }
}

type KeyType = 'genre' | 'actor' | 'category';

async function main(key: KeyType) {
  console.log('🌱 Starting seed...');
  switch (key) {
    case 'genre':
      await seedGenres();
      break;
    case 'actor':
      await seedActors();
      break;
    case 'category':
      await seedCategories();
      break;
    default:
      break;
  }
}

main('category')
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
