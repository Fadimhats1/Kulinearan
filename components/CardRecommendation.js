import { Star } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";

export const CardRecommendation = ({
  id,
  name,
  rating,
  avgPrice,
  location,
  categories = [],
  imgSrc,
  totalReviews,
  index,
  tabValue,
}) => {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => {
        router.push(`/detail/${name}`);
      }}
      key={`${name} recommendation ${tabValue} key`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.125 * index, duration: 1, type: "spring" }}
      className="flex flex-col rounded-xl overflow-hidden shadow-md hover:cursor-pointer"
    >
      <Image
        src={"https://picsum.photos/1080/720"}
        width={1080}
        height={720}
        className="w-full h-full aspect-[16/9] object-cover bg-zinc-400"
        alt={name}
      />
      <div className="py-3 px-4 flex flex-col gap-3 bg-white">
        <h4 className="font-semibold text-xl">{name}</h4>
        <div className="flex gap-2">
          <div className="bg-orange-300/30 w-fit p-1 py-1 px-2 rounded-lg flex items-center gap-1">
            <div className="flex p-1 bg-orange-400/70 rounded-full items-center ">
              <Star size={12} color="#fff" />
            </div>
            <p className="text-sm text-orange-400/70 font-bold">
              {rating === 0 && totalReviews === 0 ? "N/A" : rating}
            </p>
          </div>
          <div className="bg-green-300/30 w-fit p-1 px-2 rounded-lg flex items-center justify-center ">
            <p className="text-green-500 text-sm font-semibold">
              Rp. {avgPrice / 1000}K in average
            </p>
          </div>
        </div>
        <div className="font-medium text-xs flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-zinc-400">3.2km</p>
            <div className="h-[50%] bg-zinc-400 w-[1px]"></div>
            <p className="text-zinc-400">{location}</p>
          </div>
          <div className="flex items-center gap-1">
            {categories.map((item, index) => {
              if (index === 0) {
                return (
                  <p
                    key={`tag key ${item.categoryName}`}
                    className="text-zinc-400"
                  >
                    {item.categoryName}
                  </p>
                );
              }
              return (
                <div
                  key={`tag key ${item.categoryName}`}
                  className="flex gap-1 items-center"
                >
                  <div className="h-1 w-1 bg-zinc-400 rounded-full"></div>
                  <p className="text-zinc-400">{item.categoryName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
