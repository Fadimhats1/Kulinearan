function adjustTotalReview(reviewData) {
  return {
    ...reviewData,
    author: {
      ...reviewData.author,
      totalReviews: reviewData.author.totalReviews + 1,
    },
  };
}

function adjustNewReview(prevData, newData) {
  return prevData.reviews.map((item) => {
    if (item.authorId === newData.authorId) {
      return adjustTotalReview(item);
    }
    return item;
  });
}

function adjustRating(prevData, newData, totalReviews) {
  const rating =
    (prevData.rating * prevData.totalReviews + newData.rating) / totalReviews;
  return rating.toFixed(1);
}

export { adjustNewReview, adjustRating, adjustTotalReview };
