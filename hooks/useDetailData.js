import { adjustNewReview, adjustRating, adjustTotalReview } from '@/lib/function';
import { useState } from 'react';

const useDetailData = (restaurantData) => {
  const [data, setData] = useState(restaurantData);

  function onAddReview(newData) {
    setData((prevData) => {
      const totalReviews = prevData.totalReviews + 1;
      const rating = adjustRating(prevData, newData, totalReviews);
      const reviews = adjustNewReview(prevData, newData);

      return {
        ...prevData,
        totalReviews,
        rating,
        reviews: [...reviews, adjustTotalReview(newData)],
      };
    });
  }

  return [data, onAddReview];
};

export default useDetailData;
