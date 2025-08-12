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
  });
}

async function seedRestaurants() {
  const dataRestaurant = [
    {
      name: "Ramen Ya!",
      avgPrice: 30000,
      location: "Pantai Indah Kapuk, Jakarta",
      openTime: "Setiap hari, 08.00 - 21.00",
      contact: "+62895342958390",
      categories: ["Fine Dining"]
    },
    {
      name: "Goobne",
      avgPrice: 12000,
      location: "Pantai Indah Kapuk, Jakarta",
      openTime: "Rabu, 08.00 - 21.00",
      contact: "+62895342958390",
      categories: ["Burger"]
    },
    {
      name: "Golden Lamian",
      avgPrice: 15000,
      location: "Senayan City, Senayan, Jakarta",
      contact: "+62895342958390",
      openTime: "Senin, 08.00 - 22.00",
      categories: ["Fine Dining"]
    },
    {
      name: "Afterhour",
      avgPrice: 8000,
      location: "Sarinah Building, Thamrin, Jakarta",
      contact: "+62895342958390",
      openTime: "Kamis, 10.00 - 22.00",
      categories: ["Fine Dining"]
    },
    {
      name: "Ecology Bistro & Lounge",
      avgPrice: 21000,
      location: "Pantai Indah Kapuk, Jakarta",
      contact: "+62895342958390",
      openTime: "Jumat, 10.00 - 23.59",
      categories: ["Burger"]
    },
    {
      name: "Melly's Garden",
      avgPrice: 30000,
      location: "Menteng, Jakarta",
      contact: "+62895342958390",
      openTime: "Minggu, 08.00 - 21.00",
      categories: ["Fine Dining"]
    },
    {
      name: "Sushi Express",
      avgPrice: 25000,
      location: "Gandaria City, Kebayoran Lama, Jakarta",
      contact: "+62895342958390",
      openTime: "Selasa, 09.00 - 22.30",
      categories: ["Sushi"]
    },
    {
      name: "Pizza Haven",
      avgPrice: 18000,
      location: "Kemang, Jakarta Selatan",
      contact: "+62895342958390",
      openTime: "Rabu, 08.00 - 21.30",
      categories: ["Pizza"]
    },
    {
      name: "Sushi Palace",
      avgPrice: 30000,
      location: "Plaza Senayan, Jakarta",
      contact: "+62895342958390",
      openTime: "Minggu, 09.00 - 23.00",
      categories: ["Sushi"]
    },
    {
      name: "Tokyo Sushi Bar",
      avgPrice: 25000,
      location: "Pacific Place, Jakarta",
      contact: "+62895342958390",
      openTime: "Senin, 08.00 - 21.30",
      categories: ["Sushi"]
    },
    {
      name: "Sakura Sushi House",
      avgPrice: 35000,
      location: "Kemang, Jakarta Selatan",
      contact: "+62895342958390",
      openTime: "Kamis, 11.00 - 23.59",
      categories: ["Sushi"]
    },
    {
      name: "Burger Tek",
      avgPrice: 10000,
      location: "Depok Town Square",
      openTime: "Kamis, 11.00 - 22.00",
      contact: "+62895342958390",
      categories: ["Burger"]
    },
    {
      name: "Healthy Bowls",
      avgPrice: 20000,
      location: "Kuningan City, Jakarta",
      contact: "+62895342958390",
      openTime: "Jumat, 09.00 - 22.00",
      categories: ["Fine Dining"]
    },
    {
      name: "Ramen Delight",
      avgPrice: 22000,
      location: "Plaza Indonesia, Jakarta",
      contact: "+62895342958390",
      openTime: "Sabtu, 10.00 - 22.00",
      categories: ["Fine Dining"]
    },
    {
      name: "Veggie Delight",
      avgPrice: 15000,
      location: "Cilandak Town Square, Depok",
      contact: "+62895342958390",
      openTime: "Selasa, 09.00 - 22.00",
      categories: ["Burger"]
    },
  ];

  for (const item of dataRestaurant) {
    const { categories, ...restaurantData } = item;
    
    const restaurant = await prisma.restaurants.create({
      data: restaurantData,
    });

    // Create restaurant-category associations
    for (const categoryName of categories) {
      await prisma.restaurantCategory.create({
        data: {
          restaurantId: restaurant.restaurantId,
          categoryName: categoryName
        }
      });
    }
  }
}

async function seedUsers() {
  await prisma.users.createMany({
    data: [
      {
        userId: "d3329e62-afb1-4c66-a7a3-874504f4b434",
        username: "Kurnia",
        occupation: "Influencer",
        email: "dummy1@gmail.com",
        password: "$2b$10$6sRNyfapsFb2Cb0JU0kfU.yqQf2JB6DnFXHTVfBSetqufphaDJWgy",
      },
      {
        userId: "32927d95-8d0e-4ae8-b404-00429482423d",
        username: "Nia",
        occupation: "Food Vlogger",
        email: "dummy2@gmail.com",
        password: "$2b$10$6sRNyfapsFb2Cb0JU0kfU.yqQf2JB6DnFXHTVfBSetqufphaDJWgy",
      },
      {
        userId: "a94fb41d-e74b-431a-9cfe-f642a69a60a7",
        username: "Steven",
        occupation: "Hamba Allah",
        email: "dummy3@gmail.com",
        password: "$2b$10$6sRNyfapsFb2Cb0JU0kfU.yqQf2JB6DnFXHTVfBSetqufphaDJWgy",
      },
    ],
  });
}

async function seedReviews() {
  const data = [
    {
      title: "Pengalaman Kuliner Menggoda",
      body: "Restoran ini tidak hanya menyajikan hidangan lezat tetapi juga memberikan pengalaman kuliner yang tak terlupakan. Dengan pelayanan yang ramah dan atmosfer yang menyenangkan, Santap Lezat pantas menjadi pilihan utama bagi para pecinta makanan.",
      rating: 5,
      authorId: "d3329e62-afb1-4c66-a7a3-874504f4b434",
      restaurantId: 1,
    },
    {
      title: "Kelezatan yang terjaga",
      body: "Rasa Sejati selalu berhasil menjaga kualitas makanan mereka. Setiap kunjungan saya dijamin dengan cita rasa yang konsisten dan bahan-bahan berkualitas tinggi. Dari hidangan utama hingga hidangan penutup, semuanya memanjakan lidah.",
      rating: 5,
      authorId: "32927d95-8d0e-4ae8-b404-00429482423d",
      restaurantId: 2,
    },
    {
      title: "Pedes banget tapi enak!",
      body: "Tidak recommended buat bocil, tapi untuk yang suka pedes sangat sangat recommend!",
      rating: 4,
      authorId: "a94fb41d-e74b-431a-9cfe-f642a69a60a7",
      restaurantId: 3,
    },
    {
      title: "Burgernya juicy parah",
      body: "Sizenya gede, rasanya enak, murah lagi... cocok banget buat anak kost",
      rating: 4,
      authorId: "a94fb41d-e74b-431a-9cfe-f642a69a60a7",
      restaurantId: 4,
    },
    {
      title: "Ramen langganan",
      body: "Rasanya oriental banget, cocok buat lidah orang indonesia. Comfort foodnya aku dan mbak pacar hihihi",
      rating: 4,
      authorId: "32927d95-8d0e-4ae8-b404-00429482423d",
      restaurantId: 5,
    },
  ];

  for (const item of data) {
    await prisma.reviews.create({ data: item });

    await prisma.users.update({
      where: { userId: item.authorId },
      data: { totalReviews: { increment: 1 } },
    });

    await prisma.restaurants.update({
      where: { restaurantId: item.restaurantId },
      data: { totalReviews: { increment: 1 } },
    });
  }
}

async function main() {
  await seedCategory();
  await seedRestaurants();
  await seedUsers();
  await seedReviews();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });