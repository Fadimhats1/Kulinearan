import Navbar from "@/components/Navbar";
import {
  DollarSign,
  Clock,
  Milestone,
  MapPin,
  Copy,
  Phone,
  Globe2,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { BASE_URL } from "@/lib/constant";
import StarRatings from "react-star-ratings";
import useDetailData from "@/hooks/useDetailData";
import StarAndReview from "@/components/detail restaurant/StarAndReview";

export const getServerSideProps = async (ctx) => {
  const res = await fetch(`${BASE_URL}/restaurant/${ctx.params.name}`).then(
    (data) => data.json()
  );

  return {
    props: {
      dataRestaurant: res.data,
    },
  };
};

const DetailPage = ({ dataRestaurant }) => {
  const [data, onAddReview] = useDetailData(dataRestaurant);
  const avgPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    
  }).format(data.avgPrice);

  return (
    <div className="flex flex-col items-center overflow-hidden bg-gray-100 min-h-screen ">
      <Head>
        <title>Kulinearan</title>
      </Head>
      <Navbar />

      <main className="my-36   w-fit lg:max-w-[1080px] px-6 sm:px-16  xl:max-w-[80%] flex flex-col gap-4">
        <section className="bg-white p-6 lg:p-10 flex flex-col gap-4 w-full rounded-xl">
          <h2 className="text-3xl sm:text-4xl font-bold">{data.name}</h2>
          {/* ratings and price */}
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex gap-2 items-center">
              <div className={`pb-1`}>
                <StarRatings
                  starDimension="24px"
                  starRatedColor="rgb(250 204 21 / 1)"
                  starSpacing="0px"
                  rating={parseFloat(data.rating)}
                />
              </div>
              <p className="text-yellow-500 text-xl font-bold">{data.rating}</p>
              <p>{`(${data.totalReviews} ulasan)`}</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="hidden lg:block mx-1 h-4 w-[1px] bg-zinc-500"></div>
              <div className="flex ">
                <DollarSign
                  size={16}
                  className={`${
                    data.avgPrice > 5000 ? "text-green-500" : "text-gray-400/70"
                  }`}
                />
                <DollarSign
                  size={16}
                  className={`${
                    data.avgPrice > 10000
                      ? "text-green-500"
                      : "text-gray-400/70"
                  }`}
                />
                <DollarSign
                  size={16}
                  className={`${
                    data.avgPrice > 15000
                      ? "text-green-500"
                      : "text-gray-400/70"
                  }`}
                />
              </div>
              <p className="font-medium">{avgPrice} / orang</p>
            </div>
          </div>

          {/* clock and tags */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <div className="flex gap-2 items-center">
              <Clock className="text-zinc-500" />
              <p className="text-green-500 font-bold">Buka</p>
              <div className="h-1 w-1 bg-zinc-400 rounded-full"></div>
              <p>{data.openTime}</p>
              <div className="hidden lg:block mx-1 h-4 w-[1px] bg-zinc-500"></div>
            </div>
            <div className="flex gap-1.5">
              {data.categories.map((item, index) => {
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
                    className="flex gap-1.5 items-center"
                  >
                    <div className="h-1 w-1 bg-zinc-400 rounded-full"></div>
                    <p className="text-zinc-400">{item.categoryName}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-4">
            <motion.img
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              src={"https://picsum.photos/1080"}
              className="object-cover w-full duration-300 bg-gray-400 lg:col-span-2 lg:row-span-2 aspect-video rounded-2xl hover:cursor-pointer"
            />
            <motion.img
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              src="https://picsum.photos/1080"
              className="object-cover w-full duration-300 bg-gray-400 aspect-video rounded-2xl hover:cursor-pointer"
            />
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl overflow-hidden group hover:cursor-pointer"
            >
              <img
                src="https://picsum.photos/1080"
                className="object-cover w-full duration-300 bg-gray-400 aspect-video grid place-items-center"
              />
              <div className=" items-center justify-center group-hover:flex group-hover:inset-0 duration-300 absolute bg-black/20">
                <p className="text-white font-bold">Lihat lebih banyak</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="grid grid-cols-1 overflow-hidden gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <StarAndReview {...data} onAddReview={onAddReview} />
          <section className="bg-white p-6 lg:p-10 h-fit flex flex-col gap-4 rounded-xl">
            <h2 className="font-semibold text-2xl">Lokasi Restoran</h2>
            <div className="w-full flex flex-col gap-4">
              <img
                src="/maps.png"
                className="aspect-video rounded-xl object-cover"
              />
              <p className="font-semibold flex items-center gap-1">
                <span>
                  <MapPin className="w-5" />
                </span>{" "}
                {data.location}
              </p>
              <div className="flex gap-2">
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/search/${data.location
                    .split(",")
                    .join("+")}/`}
                  className="w-fit px-3 font-bold text-red-500 hover:text-white hover:bg-red-500 duration-300 flex gap-2 py-1.5 border-2 border-red-500 rounded-lg"
                >
                  <Milestone className="w-5" />
                  Direction
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "thank you for clicking me :)"
                    );
                  }}
                  className="w-fit px-3 group hover:text-white duration-300 font-bold flex items-center gap-2 py-1.5 border-2 border-zinc-500 hover:bg-zinc-500 rounded-lg"
                >
                  <Copy className="w-5" />
                  Salin
                </button>
              </div>
              <div className="w-full h-[0.5px] my-2 bg-zinc-500/40 rounded-md"></div>
              <h2 className="font-semibold text-xl">Kontak Restoran</h2>
              <p className="flex gap-2 items-center">
                <span>
                  <Phone className="w-5" />
                </span>
                +62895342958390
              </p>
              <p className="flex gap-2 items-center">
                <span>
                  <Globe2 className="w-5" />
                </span>
                www.google.com
              </p>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default DetailPage;
