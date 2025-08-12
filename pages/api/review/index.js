import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  const { reviewId } = req.query;
  try {
    if (req.method === 'POST') {
      const { title, body, authorId, rating, restaurantId } = req.body;
      const data = await prisma.reviews.create({
        data: {
          title,
          body,
          rating,
          restaurantId,
          authorId,
        },
        include: { author: true },
      });

      const restaurantData = await prisma.restaurants.findFirst({
        where: { restaurantId },
        include: { reviews: true },
      });

      let avgRating = 0;
      restaurantData.reviews.map((item) => {
        avgRating += item.rating;
      });

      avgRating /= restaurantData.reviews.length;
      avgRating = parseFloat(avgRating.toFixed(1));

      await prisma.users.update({
        where: { userId: authorId },
        data: { totalReviews: { increment: 1 } },
      });

      await prisma.restaurants.update({
        where: { restaurantId },
        data: { rating: avgRating, totalReviews: { increment: 1 } },
      });

      res.status(200).json({ data });
    } else if (req.method === 'GET') {
      const data = await prisma.reviews.findMany();
      res.status(200).json({ data });
    } else if (req.method === 'DELETE') {
      const data = await prisma.reviews.delete({
        where: { reviewId: parseInt(reviewId) },
      });
      console.log(data);

      res.status(200).json({ data });

      res.status(500).send({ error });
    } else if (req.method === 'PUT') {
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}
