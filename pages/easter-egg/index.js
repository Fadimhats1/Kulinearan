import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  return (
    <div className="h-screen overflow-hidden relative w-full flex items-center justify-center bg-white">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3, ease: 'easeInOut', type: 'tween' }}
        className="text-black text-2xl absolute top-9 font-bold tracking-wider"
      >
        Apa lo liat liat?
      </motion.h1>

      <motion.img
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeInOut', type: 'tween' }}
        className="relative z-10 w-[90%] max-w-[1000px]"
        src="/bg-future.svg"
      />
      <motion.img
        initial={{ scale: 1.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeInOut', type: 'tween' }}
        src="/hero.png"
        className="w-[90%] max-w-[550px] ml-8 lg:ml-36 z-20 fixed bottom-0"
      />

      <motion.button
        onClick={() => router.replace('/')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 9, ease: 'easeInOut', type: 'tween' }}
        className="absolute flex gap-2 border border-black px-4 py-2 rounded-xl bg-black h-fit w-fit hover:bg-white duration-500 hover:text-black text-white  -translate-x-1/2 left-1/2 bottom-[20%] sm:top-9 sm:left-9 sm:-translate-x-0 z-[999]"
      >
        <ChevronLeft /> Go Back
      </motion.button>

      <motion.h1
        initial={{ opacity: 0, x: 120, rotate: 90 }}
        animate={{ scale: 1, x: 0, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeInOut', type: 'tween' }}
        className="rotate-90 hidden sm:block w-fit absolute top-1/2 z-30 text-2xl tracking-widest text-gray-800 -translate-y-1/2 -right-[24px]"
      >
        EASTER - EGG
      </motion.h1>

      <motion.img
        initial={{ opacity: 0, x: -120, rotate: 270 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: 'easeInOut', type: 'tween' }}
        className="absolute overflow-hidden hidden sm:block -left-[100px] top-1/2 -translate-y-1/2 h-[20px] rotate-270"
        src="/left-future.svg"
      />

      <motion.img
        initial={{ opacity: 0, rotate: 120 }}
        animate={{ opacity: [0, 1, 0, 1, 0, 1], x: 0 }}
        transition={{ duration: 5, delay: 4, ease: 'easeInOut', type: 'tween' }}
        className="absolute z-[100] overflow-hidden hidden sm:block sm:left-[60%] lg:left-[55%] -translate-x-1/2 top-[10%] rotate-[120deg] w-[200px]"
        src="/misc.svg"
      />
    </div>
  );
};

export default index;
