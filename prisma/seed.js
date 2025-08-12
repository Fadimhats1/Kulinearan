const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

faker.locale = 'id_ID';

const prisma = new PrismaClient();

async function main() {
  // Categories
  const categories = await Promise.all(
    ["Pizza", "Sushi", "Burger", "Fine Dining"].map(name =>
      prisma.category.create({ data: { categoryName: name } })
    )
  );

  // Users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.users.create({
        data: {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      })
    )
  );

  // Restaurants
  for (let i = 0; i < 10; i++) {
    // Price: multiple of 5000, range 20k–300k
    const priceValue = Math.floor(faker.number.int({ min: 20000, max: 300000 }) / 5000) * 5000;

    // Rating: 1 decimal place
    const ratingValue = parseFloat(
      faker.number.float({ min: 3, max: 5, precision: 0.1 }).toFixed(1)
    );

    const restaurant = await prisma.restaurants.create({
      data: {
        name: faker.company.name(),
        rating: ratingValue,
        avgPrice: priceValue,
        location: faker.location.city(),
        openTime: '08:00 - 22:00',
        contact: faker.phone.number(),
        website: faker.internet.url(),
      },
    });

    // Attach categories
    const chosenCategories = faker.helpers.arrayElements(
      categories,
      faker.number.int({ min: 1, max: 3 })
    );
    for (const category of chosenCategories) {
      await prisma.restaurantCategory.create({
        data: {
          restaurantId: restaurant.restaurantId,
          categoryName: category.categoryName,
        },
      });
    }

    // Reviews
    const reviewCount = faker.number.int({ min: 1, max: 5 });
    for (let r = 0; r < reviewCount; r++) {
      const author = faker.helpers.arrayElement(users);
      await prisma.reviews.create({
        data: {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraph(),
          rating: faker.number.int({ min: 1, max: 5 }),
          restaurantId: restaurant.restaurantId,
          authorId: author.userId,
        },
      });
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
