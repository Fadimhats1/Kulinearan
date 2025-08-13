const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedCategory() {
  await prisma.category.createMany({
    data: [
      { categoryName: "Pizza" },
      { categoryName: "Sushi" },
      { categoryName: "Burger" },
      { categoryName: "Fine Dining" },
    ],
    skipDuplicates: true,
  });
}

async function seedRestaurants() {
  const dataRestaurant = [
    { name: "Ramen Ya!", avgPrice: 30000, location: "Pantai Indah Kapuk, Jakarta", openTime: "Setiap hari, 08.00 - 21.00", contact: "+62895342958390", categories: ["Fine Dining"] },
    { name: "Goobne", avgPrice: 12000, location: "Pantai Indah Kapuk, Jakarta", openTime: "Rabu, 08.00 - 21.00", contact: "+62895342958390", categories: ["Burger"] },
    { name: "Golden Lamian", avgPrice: 15000, location: "Senayan City, Senayan, Jakarta", openTime: "Senin, 08.00 - 22.00", contact: "+62895342958390", categories: ["Fine Dining"] },
    { name: "Afterhour", avgPrice: 8000, location: "Sarinah Building, Thamrin, Jakarta", openTime: "Kamis, 10.00 - 22.00", contact: "+62895342958390", categories: ["Fine Dining"] },
    { name: "Sushi Express", avgPrice: 25000, location: "Gandaria City, Kebayoran Lama, Jakarta", openTime: "Selasa, 09.00 - 22.30", contact: "+62895342958390", categories: ["Sushi"] },
    { name: "Pizza Haven", avgPrice: 18000, location: "Kemang, Jakarta Selatan", openTime: "Rabu, 08.00 - 21.30", contact: "+62895342958390", categories: ["Pizza"] },
    { name: "Sushi Palace", avgPrice: 30000, location: "Plaza Senayan, Jakarta", openTime: "Minggu, 09.00 - 23.00", contact: "+62895342958390", categories: ["Sushi"] },
    { name: "Tokyo Sushi Bar", avgPrice: 25000, location: "Pacific Place, Jakarta", openTime: "Senin, 08.00 - 21.30", contact: "+62895342958390", categories: ["Sushi"] },
    { name: "Sakura Sushi House", avgPrice: 35000, location: "Kemang, Jakarta Selatan", openTime: "Kamis, 11.00 - 23.59", contact: "+62895342958390", categories: ["Sushi"] },
    { name: "Burger Tek", avgPrice: 10000, location: "Depok Town Square", openTime: "Kamis, 11.00 - 22.00", contact: "+62895342958390", categories: ["Burger"] },
    { name: "Healthy Bowls", avgPrice: 20000, location: "Kuningan City, Jakarta", openTime: "Jumat, 09.00 - 22.00", contact: "+62895342958390", categories: ["Fine Dining"] },
    { name: "Ramen Delight", avgPrice: 22000, location: "Plaza Indonesia, Jakarta", openTime: "Sabtu, 10.00 - 22.00", contact: "+62895342958390", categories: ["Fine Dining"] },
    { name: "Veggie Delight", avgPrice: 15000, location: "Cilandak Town Square, Depok", openTime: "Selasa, 09.00 - 22.00", contact: "+62895342958390", categories: ["Burger"] },
    { name: "Pizza Corner", avgPrice: 17000, location: "Menteng, Jakarta", openTime: "Senin, 08.00 - 21.00", contact: "+62895342958390", categories: ["Pizza"] },
    { name: "Sushi World", avgPrice: 28000, location: "Senayan City, Jakarta", openTime: "Rabu, 10.00 - 22.30", contact: "+62895342958390", categories: ["Sushi"] },
    { name: "Ramen House", avgPrice: 20000, location: "Kemang, Jakarta Selatan", openTime: "Selasa, 08.00 - 21.00", contact: "+62895342958390", categories: ["Fine Dining"] },
    { name: "Burger King", avgPrice: 12000, location: "Plaza Senayan, Jakarta", openTime: "Sabtu, 09.00 - 22.00", contact: "+62895342958390", categories: ["Burger"] },
    { name: "Fine Dine Royale", avgPrice: 50000, location: "Menteng, Jakarta", openTime: "Minggu, 10.00 - 23.00", contact: "+62895342958390", categories: ["Fine Dining"] },
    { name: "Pizza Planet", avgPrice: 19000, location: "Kuningan, Jakarta", openTime: "Jumat, 08.00 - 21.00", contact: "+62895342958390", categories: ["Pizza"] },
    { name: "Sushi & Co", avgPrice: 32000, location: "Plaza Indonesia, Jakarta", openTime: "Kamis, 09.00 - 23.00", contact: "+62895342958390", categories: ["Sushi"] },
  ];

  for (const item of dataRestaurant) {
    const { categories, ...restaurantData } = item;

    const restaurant = await prisma.restaurants.create({
      data: restaurantData,
    });

    for (const categoryName of categories) {
      await prisma.restaurantCategory.create({
        data: {
          restaurantId: restaurant.restaurantId,
          categoryName,
        },
      });
    }
  }
}

async function seedUsers() {
  const usersData = [
    { username: "Kurnia", occupation: "Influencer", email: "dummy1@gmail.com", password: "$2b$10$6sRNyfapsFb2Cb0JU0kfU.yqQf2JB6DnFXHTVfBSetqufphaDJWgy" },
    { username: "Nia", occupation: "Food Vlogger", email: "dummy2@gmail.com", password: "$2b$10$6sRNyfapsFb2Cb0JU0kfU.yqQf2JB6DnFXHTVfBSetqufphaDJWgy" },
    { username: "Steven", occupation: "Hamba Allah", email: "dummy3@gmail.com", password: "$2b$10$6sRNyfapsFb2Cb0JU0kfU.yqQf2JB6DnFXHTVfBSetqufphaDJWgy" },
  ];

  await prisma.users.createMany({ data: usersData, skipDuplicates: true });

  return prisma.users.findMany(); // return the users with real IDs
}

async function seedReviews(users) {
  const restaurants = await prisma.restaurants.findMany();

  const reviewsData = [
    {
      title: "Pengalaman Kuliner Menggoda",
      body: "Restoran ini tidak hanya menyajikan hidangan lezat tetapi juga memberikan pengalaman kuliner yang tak terlupakan...",
      rating: 5,
      authorUsername: "Kurnia",
      restaurantName: "Ramen Ya!",
    },
    {
      title: "Kelezatan yang terjaga",
      body: "Rasa Sejati selalu berhasil menjaga kualitas makanan mereka...",
      rating: 5,
      authorUsername: "Nia",
      restaurantName: "Goobne",
    },
    {
      title: "Pedes banget tapi enak!",
      body: "Tidak recommended buat bocil, tapi untuk yang suka pedes sangat sangat recommend!",
      rating: 4,
      authorUsername: "Steven",
      restaurantName: "Golden Lamian",
    },
  ];

  for (const item of reviewsData) {
    const user = users.find(u => u.username === item.authorUsername);
    const restaurant = restaurants.find(r => r.name === item.restaurantName);

    if (!user || !restaurant) continue;

    const review = await prisma.reviews.create({
      data: {
        title: item.title,
        body: item.body,
        rating: item.rating,
        authorId: user.userId,
        restaurantId: restaurant.restaurantId,
      },
    });

    await prisma.users.update({
      where: { userId: user.userId },
      data: { totalReviews: { increment: 1 } },
    });

    await prisma.restaurants.update({
      where: { restaurantId: restaurant.restaurantId },
      data: { totalReviews: { increment: 1 } },
    });
  }
}

async function main() {
  await seedCategory();
  await seedRestaurants();
  const users = await seedUsers();
  await seedReviews(users);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
