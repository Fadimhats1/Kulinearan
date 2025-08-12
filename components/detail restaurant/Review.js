import { ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { motion, useAnimate } from 'framer-motion';

export const Review = ({
  author,
  rating,
  reviewId,
  followers,
  title,
  body,
  createdAt,
}) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    let rotateValue = [45, 0];

    if (!isHelpful) {
      rotateValue = [-45, 0];
    }

    animate(
      '.helpful',
      { rotate: rotateValue },
      { type: 'spring', duration: 1, stiffness: 800 }
    );
  }, [isHelpful]);

  return (
    <motion.div
      key={`motion review ${reviewId}`}
      variants={{
        hidden: { x: '-90%', opacity: 0 },
        appear: { x: 0, opacity: 1 },
      }}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="appear"
      exit="hidden"
      transition={{ duration: 1, type: 'spring' }}
      className="bg-white border-t-2 border-zinc-100 h-fit px-2 py-8 lg:py-12 flex flex-col gap-4"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-4">
        {/* Profile */}
        <div className="flex items-center w-fit flex-col">
          <img
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${author.username}`}
            className="w-16 h-16 bg-gray-100 rounded-full"
          ></img>
          <h4 className="font-bold text-lg mt-2">{author.username}</h4>
          <p>{author.occupation}</p>
          <div className="flex w-56 justify-center">
            <p>{author.totalReviews} Ulasan</p>
            <div className="flex gap-1 ml-1 items-center">
              <div className="h-1 w-1 bg-zinc-500 rounded-full"></div>
              <p className="352 Followers">{followers}100 Followers</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1 text-yellow-400">
          <div className="flex justify-between gap-4">
            <StarRatings
              starDimension="18"
              starSpacing="2px"
              rating={rating}
              starRatedColor="rgb(250 204 21 / 1)"
            />
            <p>{createdAt}</p>
          </div>
          <h4 className="text-lg mt-1 font-semibold">{title}</h4>
          <p>{body}</p>
          {/* <div className="grid grid-cols-3 gap-2 my-2">
            <img
              src="https://images.unsplash.com/photo-1621188988909-fbef0a88dc04?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="object-cover cols-span-1 aspect-square bg-gray-300 rounded-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="object-cover aspect-square cols-span-1 bg-gray-300 rounded-xl"
            />
          </div> */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            ref={scope}
            onClick={() => {
              setIsHelpful((prev) => !prev);
            }}
            className={`border mt-4 items-center font-semibold tracking-wide duration-300 w-fit px-4 py-2 rounded-lg flex  ${
              isHelpful
                ? 'text-white bg-red-500 border-red-500'
                : 'border-zinc-400 text-zinc-400'
            } gap-2`}
          >
            <motion.div
              variants={{ liked: { rotate: 60 } }}
              transition={{ type: 'spring' }}
              className="helpful"
            >
              <ThumbsUp size={18} />
            </motion.div>{' '}
            Membantu
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
