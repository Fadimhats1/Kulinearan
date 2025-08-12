import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { name, location } = req.query;
    const data = await prisma.restaurants.findMany({
      where: { name: { contains: name }, location: { contains: location } },
      include: {
        restaurantCategories: {
          include: { category: true },
        },
      },
    });

    // Transform the result to get category names
    const transformedData = data.map((restaurant) => ({
      ...restaurant,
      categories: restaurant.restaurantCategories.map(
        (rc) => rc.category.categoryName
      ),
    }));

    res.status(200).json({ data: transformedData });
  } else if (req.method === "POST") {
  }
}
