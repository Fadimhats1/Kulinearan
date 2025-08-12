import React from 'react';
import { motion } from 'framer-motion';

export const CardCollection = ({ name, index }) => {
  return (
    <motion.div
      key={`${name} collection key`}
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.75, delay: 0.125 * index }}
      className={`flex flex-col overflow-hidden justify-end bg-gradient-to-br from-purple-600 to-blue-600 lg:aspect-[12/16] lg:w-full lg:h-full h-72 rounded-2xl collection-${index}`}
    >
      <div className="flex flex-col gap-2 w-full pt-12 pb-6 px-4 bg-gradient-to-b from-white/0 to-black text-white">
        <h3 className="text-xl text-white">{name}</h3>
        <button className=" w-fit font-bold">Lihat koleksi {'>'}</button>
      </div>
    </motion.div>
  );
};
