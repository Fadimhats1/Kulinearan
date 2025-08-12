import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { name: restaurantName } = req.query;
  const result = await prisma.restaurants.findFirst({
    where: { name: restaurantName },
    include: {
      restaurantCategories: { include: { category: true } },
      reviews: { include: { author: true } },
    },
  });

  const formattedReviewsDate = result.reviews.map((item) => {
    var dateObject = new Date(item.createdAt);

    // Mendapatkan tanggal, bulan, dan tahun
    var day = dateObject.getDate();
    var month = dateObject.toLocaleString("id-ID", { month: "long" });
    var year = dateObject.getFullYear();

    // Membuat string hasil yang diinginkan
    var formattedDate = day + " " + month + " " + year;

    return { ...item, createdAt: formattedDate };
  });

  const categories = result.restaurantCategories.map(
    (rc) => rc.category.categoryName
  );
  result.categories = categories;

  const data = { ...result, reviews: formattedReviewsDate };

  res.status(200).json({ data });
}
