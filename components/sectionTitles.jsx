"use client";

import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 1 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function SectionTitles({ title, bgText }) {
  return (
    <div className="flex flex-row relative w-full z-0 my-[50px] xl:my-[50px] items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.5 }}
        className="flex flex-col gap-1.5 w-[20px] h-full"
      >
        <motion.div
          variants={dotVariants}
          className="!w-[10px] !h-[10px] rounded-full bg-zold"
        />
        <motion.div
          variants={dotVariants}
          className="!w-[10px] !h-[10px] rounded-full bg-zold"
        />
        <motion.div
          variants={dotVariants}
          className="!w-[10px] !h-[10px] rounded-full bg-zold"
        />
      </motion.div>

      <h2 className="!text-[20px] !md:text-[30px] text-sotet font-black">
        {title}
      </h2>
      <p className="absolute flex top-[-25px] md:top-[-50px] left-[20px] text-zold font-bold text-[25px] xl:text-[60px] 2xl:text-[80px] opacity-10">
        {bgText}
      </p>
    </div>
  );
}
