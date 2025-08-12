import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Toggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      return;
    }
    document.documentElement.classList.add('dark');
  }, [isDark]);

  return (
    <motion.div
      onClick={() => setIsDark((prev) => !prev)}
      className={`bg-white/80 w-16 h-8 hover:cursor-pointer rounded-full  flex items-center px-2 ${
        isDark ? 'justify-end' : 'justify-start'
      }`}
    >
      <motion.div
        layout
        className="h-5 w-5 bg-white rounded-full"
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
      ></motion.div>
    </motion.div>
  );
};
