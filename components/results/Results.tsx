"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import results from "./resultsData";
import SectionTitles from "../sectionTitles";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { SiMinutemailer } from "react-icons/si";
import { AnimatePresence, motion } from "motion/react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

export default function ResultsComp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="flex flex-col w-full py-[50px] overflow-hidden">
      <div className="flex flex-col md:flex-row p-[10px] md:p-[20px] items-center shadow-[5px_5px_10px_0px_rgba(0,0,0,0.35)] justify-between gap-10 md:gap-12 w-[90%] max-w-[2560px] mx-auto rounded-[20px] bg-zold/10">
        {/* BAL OLDAL */}
        <div className="w-full md:w-1/2 flex flex-col ">
          <SectionTitles
            title={"Amire büszkék vagyunk"}
            bgText={"Eredményeink"}
          />

          <p className="mt-4 text-base md:text-lg opacity-80 leading-relaxed max-w-xl">
            Hiszünk abban, hogy a következetes szakmai munka és az ügyfeleink
            bizalma kézzelfogható eredményekben is megmutatkozik. Íme azok a
            mérföldkövek és elismerések, amelyeket csapatunk tagjai az elmúlt
            időszakban elértek.
          </p>

          <Link
            href="/kapcsolat"
            aria-label="Lépjen kapcsolatba velünk, hogy felmérhessük pénzügyeit egy független elemzés alkalmával. Kapcsolat gomb"
            className="w-fit mr-auto mt-[25px] kapcsolat-btn flex flex-row items-center gap-3 p-[10px] px-8 rounded-full border-2 border-[#3f4603] text-[#3f4603] text-[20px] font-bold hover:bg-[#3f4603] hover:text-[#e7ebe3] transition-all hover:shadow-[0px_5px_10px_0px_rgba(0,0,0,0.4)]"
          >
            <span className="icon-slot">
              <span className="before-hover bg-transparent ">
                <SiMinutemailer size={50} className="text-zold" />
              </span>
              <span className="after-hover bg-transparent">
                <SiMinutemailer size={50} className="text-feher" />
              </span>
            </span>

            <p>Kapcsolat</p>
          </Link>
        </div>

        {/* JOBB OLDAL */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex items-center justify-between mb-2 ">
            <div className="flex items-center text-base font-semibold">
              <div className="relative h-6 w-7 overflow-hidden inline-flex items-center justify-center">
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <motion.span
                    key={activeIndex}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({
                        y: d > 0 ? -20 : 20,
                        opacity: 0,
                      }),
                      center: {
                        y: 0,
                        opacity: 1,
                      },
                      exit: (d: number) => ({
                        y: d > 0 ? 20 : -20,
                        opacity: 0,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-zold font-bold inline-block"
                  >
                    {formatNumber(activeIndex + 1)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="opacity-40 ml-1">
                / {formatNumber(results.length)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setDirection(-1);
                  swiperRef.current?.slidePrev();
                }}
                aria-label="Előző eredmény"
                className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-zold hover:text-white transition-colors cursor-pointer"
              >
                <FiArrowLeft size={18} />
              </button>
              <button
                onClick={() => {
                  setDirection(1);
                  swiperRef.current?.slideNext();
                }}
                aria-label="Következő eredmény"
                className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-zold hover:text-white transition-colors cursor-pointer"
              >
                <FiArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Kártyák */}
          <div className="w-full">
            <Swiper
              watchSlidesProgress={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onProgress={(swiper) => {
                swiper.slides.forEach((slide) => {
                  const currentProgress = slide.progress || 0;

                  const progress = Math.min(
                    1,
                    Math.max(0, Math.abs(currentProgress)),
                  );
                  slide.style.setProperty(
                    "--slide-progress",
                    progress.toString(),
                  );
                });
              }}
              onSetTransition={(swiper, duration) => {
                swiper.slides.forEach((slide) => {
                  slide.style.setProperty(
                    "--slide-transition",
                    `${duration}ms`,
                  );
                });
              }}
              onSlideChange={(swiper) => {
                if (swiper.swipeDirection) {
                  setDirection(swiper.swipeDirection === "prev" ? -1 : 1);
                }
                setActiveIndex(swiper.realIndex);
              }}
              loop={true}
              slideToClickedSlide={true}
              grabCursor={true}
              spaceBetween={16}
              slidesPerView={1.25}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5 },
                1440: { slidesPerView: 3 },
              }}
              className="!py-8 !px-[10px]"
            >
              {results.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto">
                  {({ isActive }) => (
                    <div
                      className="h-full max-w-80 !h-[300px] text-white rounded-[10px] flex flex-col justify-between select-none relative"
                      style={{
                        transform: `scale(calc(1 - 0.18 * var(--slide-progress, ${isActive ? 0 : 1}))) 
                                    translateY(calc(-6px * (1 - var(--slide-progress, ${isActive ? 0 : 1}))))`,
                        opacity: `calc(1 - 0.45 * var(--slide-progress, ${isActive ? 0 : 1}))`,
                        boxShadow: `5px 5px 10px 0px rgba(0,0,0,calc(0.35 * (1 - var(--slide-progress, ${isActive ? 0 : 1}))))`,
                        transition: `all var(--slide-transition, 300ms) ease-out`,
                      }}
                    >
                      <div>
                        <div className="absolute inset-0 -mt-px overflow-hidden rounded-[10px] w-full">
                          <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            className="rounded-[10px] hover:scale-105 transition-all duration-300 object-cover object-top"
                          />
                          <div
                            className={`absolute bottom-0 z-10 h-[60%] w-full bg-gradient-to-t transition-colors duration-300 pointer-events-none ${
                              isActive ? "from-arany" : "from-black"
                            } to-transparent`}
                          />
                        </div>
                      </div>

                      <div className="p-[10px] z-10 relative">
                        <p className="font-medium text-white mb-[10px]">
                          {item.description}
                        </p>
                        <p className="font-medium border-white border-t">
                          {item.name}
                        </p>

                        <p className="text-sm font-semibold text-white mt-0.5 bg-zold w-fit rounded-full px-[15px]">
                          {item.year} &bull; {item.event}
                        </p>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
