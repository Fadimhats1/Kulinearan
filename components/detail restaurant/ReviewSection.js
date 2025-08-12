import useUserContext from "@/hooks/useUserContext";
import { BASE_URL } from "@/lib/constant";
import axios from "axios";
import { checkTargetForNewValues } from "framer-motion";
import { MousePointer2, Star } from "lucide-react";
import React, { useState } from "react";

const ReviewSection = ({ restaurantName, restaurantId, onAddReview }) => {
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);

  async function postReview() {
    const result = await axios.post(`${BASE_URL}/review`, {
      title,
      body,
      authorId: user.userId,
      rating,
      restaurantId,
    });

    resetInput();

    onAddReview(result.data.data);
  }

  function resetInput() {
    setTitle("");
    setBody("");
    setRating(0);
  }

  const ratingDescription = {
    1: "Sangat Buruk",
    2: "Buruk",
    3: "Biasa",
    4: "Bagus",
    5: "Sangat Bagus",
  };

  return (
    <>
      {user !== null ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postReview();
          }}
          className="p-6 lg:p-10 rounded-xl bg-white "
        >
          <h2 className="font-semibold text-2xl mb-4">Berikan Ulasan</h2>

          <div className="gap-2 lg:gap-4 flex">
            {/* <img
              className="rounded-full bg-gray-100 h-10 w-10 lg:h-12 lg:w-12"
              src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${user.username}`}
            /> */}
            <div className="flex flex-col gap-2  w-full">
              <div className="flex items-center flex-col gap-2">
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      onClick={() => {
                        setRating(index + 1);
                      }}
                      size={36}
                      className={`
                    hover:text-yellow-500
                    cursor-pointer
                    ${
                      rating >= index + 1 ? "text-yellow-400" : "text-gray-500"
                    } duration-300`}
                    />
                  ))}
                </div>
                {rating === 0 ? (
                  <div></div>
                ) : (
                  <p className="mb-5">({ratingDescription[rating]})</p>
                )}
              </div>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Title"
                className="border focus:outline-red-500/70 duration-300 rounded-lg w-full p-2"
              />
              <textarea
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                className="border focus:outline-red-500/70 duration-300 h-24 rounded-lg w-full p-2 resize-none"
                placeholder={`Leave a review for ${restaurantName}`}
              />{" "}
              <button className="p-1 px-2 w-full font-medium text-sm md:text-lg md:gap-4 items-center sm:p-2 gap-2 text-white hover:text-red-500 flex justify-center rounded-lg sm:rounded-xl border border-red-500 group hover:bg-white duration-300 bg-red-500 h-fit ">
                <MousePointer2 className="w-4 md:w-6" />
                Post
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="w-full h-12 rounded-lg bg-white flex justify-center items-center">
          <h4 className="font-semibold">
            <a className="text-red-500 cursor-pointer">Login</a> to leave a
            review on this Restaurant
          </h4>
        </div>
      )}
    </>
  );
};

export default ReviewSection;
