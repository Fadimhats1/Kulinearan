import React, { useEffect, useState } from "react";
import ReviewSection from "./ReviewSection";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import StarRatings from "react-star-ratings";
import { ChevronDown } from "lucide-react";
import { Review } from "./Review";

const StarAndReview = ({
  reviews,
  rating,
  totalReviews,
  name,
  restaurantId,
  onAddReview,
}) => {
  const [revealReview, setRevealReview] = useState(
    reviews.length >= 5 ? 5 : reviews.length
  );

  useEffect(() => {
    setRevealReview(reviews.length);
  }, [reviews]);

  return (
    <div className="flex flex-col gap-4 xl:col-span-2">
      <div className="bg-white h-fit p-6 lg:p-10 flex flex-col gap-4 rounded-xl">
        <h2 className="font-semibold text-2xl">Penilaian dan Ulasan</h2>
        <div className="w-full my-3 lg:my-6 text-center flex flex-col gap-2">
          <h3 className="font-bold text-4xl lg:text-5xl text-yellow-400">
            {rating}
          </h3>
          <div className="lg:hidden">
            <StarRatings
              starDimension="28px"
              rating={parseFloat(rating)}
              starRatedColor="rgb(250 204 21 / 1)"
            />{" "}
          </div>
          <div className="hidden lg:block">
            <StarRatings
              starDimension="32px"
              rating={parseFloat(rating)}
              starRatedColor="rgb(250 204 21 / 1)"
            />
          </div>
          <p className="lg:text-lg">{`(${totalReviews} ulasan)`}</p>
        </div>
        {reviews.length === 0 ? (
          <h1 className="text-center font-bold text-xl ">
            Belum ada ulasan nih :{"("}
          </h1>
        ) : (
          <LayoutGroup className="flex flex-col">
            <AnimatePresence>
              {Array.from({ length: revealReview }).map((_, index) => {
                const item = reviews[index];
                return <Review key={`review-${item.reviewId}`} {...item} />;
              })}
            </AnimatePresence>
            <div className="grid place-items-center">
              {reviews.length === revealReview ? (
                <button
                  onClick={() => setRevealReview(0)}
                  className="flex gap-2 px-4 py-2 border border-red-500 duration-500 hover:bg-red-500 hover:text-white text-red-500 w-fit rounded-xl"
                >
                  Sembunyikan ulasan
                  <ChevronDown className="rotate-180" />
                </button>
              ) : (
                <button
                  onClick={() =>
                    setRevealReview((prev) => {
                      const count = reviews.length - revealReview;
                      return count < 5 ? prev + count : 5;
                    })
                  }
                  className="flex gap-2 px-4 py-2 border border-red-500 duration-500 hover:bg-red-500 hover:text-white text-red-500 w-fit rounded-xl"
                >
                  Lihat {reviews.length - revealReview} ulasan lainnya{" "}
                  <ChevronDown />
                </button>
              )}
            </div>
          </LayoutGroup>
        )}
      </div>
      {/* <ReviewSection
        restaurantName={name}
        restaurantId={restaurantId}
        onAddReview={onAddReview}
      /> */}
    </div>
  );
};

export default StarAndReview;
