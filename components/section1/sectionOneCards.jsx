"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { CiLocationArrow1 } from "react-icons/ci";
import Image from "next/image";

export default function SectionOneCard({
  title,
  desc,
  number,
  category,
  icon,
  img,
}) {
  const cardRef = useRef(null);
  const [animationState, setAnimationState] = useState("hidden");
  const cardDelay = Number(number) * 0.1;

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationState("visible");
        } else {
          if (entry.boundingClientRect.top > 0) {
            setAnimationState("hidden");
          }
        }
      },
      { rootMargin: "-50px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={animationState}
      variants={cardVariants}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: animationState === "visible" ? cardDelay : 0,
      }}
      className="section-one-wrapper w-full h-full flex flex-col gap-3 relative rounded-xl p-[15px] bg-white"
    >
      {/* <div className="absolute inset-0 bg-zold/50 z-0 ">
        <Image src={img} alt={title} fill className="object-cover"></Image>
      </div> */}
      <div className="flex flex-row nowrap gap-[15px] items-center mb-[15px] z-10">
        <div className="w-[20px] h-[20px] rounded-sm border-3 border-zold bg-transparent rotate-[45deg]"></div>
        <span className="text-[15px] font-bold text-neutral-500">
          {category}
        </span>
      </div>
      <h3 className="!text-[20px] font-bold text-neutral-800">{title}</h3>
      <p className="!text-[15px] text-bold mt-auto">{desc}</p>

      <div className=" text-3xl flex flex-row justify-between z-10">
        <span className="section-one-icon text-[45px] text-arany/50">
          {icon}
        </span>
        <div className="w-[3px] h-full mx-auto bg-zold/10 rounded-full"></div>
        <a
          href="/kapcsolat"
          title="Kapcsolat"
          className="section-one-link relative p-[10px] bg-feher mb-[-15px] mr-[-15px] rounded-tl-[20px] z-10"
        >
          <CiLocationArrow1
            size={45}
            className="bg-zold text-feher rounded-full p-[5px] hover:scale-[0.8] transition  ease duration-300"
          />
        </a>
      </div>
    </motion.div>
  );
}
