"use client";
import Image from "next/image";
import Family from "../../public/images/csaladbiztositas.jpg";
import Engineer from "../../public/images/car-engineerHQ.jpg";
import Future from "../../public/images/futureHQ.jpg";

import HeroButton from "./heroButton";
import { useState } from "react";
import { TiArrowRightOutline } from "react-icons/ti";
import BreadCrumbs from "../breadCrumbs";

export default function Hero({
  mainTitle,
  needBtns,
  needStat,
  justOnePicture,
  crumbs,
}) {
  const [heroImage, setHeroImage] = useState(justOnePicture || Family);
  const [prevImage, setPrevImage] = useState(null);
  const [currentKey, setCurrentKey] = useState(1);
  const [animationClass, setAnimationClass] = useState("animate-slide-in-left");

  const handleImageChange = (newImage, targetKey) => {
    if (justOnePicture || newImage.src === heroImage.src) return;

    if (targetKey > currentKey) {
      setAnimationClass("animate-slide-in-right");
    } else {
      setAnimationClass("animate-slide-in-left");
    }

    setPrevImage(heroImage);
    setHeroImage(newImage);
    setCurrentKey(targetKey);
  };

  return (
    <div className="hero w-[90%] h-[calc(100vh-150px)] min-h-fit  max-h-[750px] max-w-[2560px] rounded-[20px] flex flex-col xl:flex-row mx-auto pt-[50px] mt-[120px] text-white relative overflow-hidden h-auto xl:h-[calc(100vh-150px)] xl:min-h-[650px] xl:max-h-[1250px]">
      {/* HÁTTÉRKÉP CONTAINER */}
      <div className="absolute top-0 left-0 w-full h-full hero-kep rounded-[20px] overflow-hidden [transform:translateZ(0)]">
        {!justOnePicture && prevImage && (
          <Image
            key={`prev-${currentKey}`}
            src={prevImage}
            alt="Pénzügyi támogatás háttér"
            fill
            className="object-cover object-center z-0 brightness-60"
          />
        )}

        {/* FELSŐ RÉTEG / FIX KÉP */}
        <Image
          key={justOnePicture ? "static-bg" : `current-${currentKey}`}
          src={heroImage}
          alt={mainTitle}
          fill
          priority
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1800px"
          className={`object-cover object-center z-1 brightness-60 ${
            justOnePicture ? "" : animationClass
          }`}
        />
      </div>

      {/* TARTALOM */}
      <div className="hero-bal w-[100%] xl:w-[50%] flex-1 flex flex-col p-[10px] relative z-20 ">
        <div className="hero-logo min-h-[50px] relative text-zold text-[20px] md:text-[40px] ml-[-10px] mt-[-60px] bg-feher w-fit px-[15px] rounded-br-[20px] font-bold z-30">
          <p>S.Y.A Solutions</p>
        </div>
        <div className="flex flex-col my-auto py-[25px] self-center justify-center">
          <h1 className="!text-[25px]  md:!text-[40px] font-bold ">
            {mainTitle}
          </h1>
        </div>

        {crumbs ? <BreadCrumbs items={crumbs} /> : null}

        {needBtns && (
          <div className="flex flex-col md:flex-row wrap gap-3  xl:mt-[0]">
            <HeroButton
              title="Családomnak"
              link={"csalad-tamogatas"}
              icon={<TiArrowRightOutline />}
              setImage={handleImageChange}
              image={Family}
              indx={1}
            />
            <HeroButton
              title="Vállalkozásomnak"
              link={"vallalkozas-tamogatas"}
              icon={<TiArrowRightOutline />}
              setImage={handleImageChange}
              image={Engineer}
              indx={2}
            />
            <HeroButton
              title="Jövőmnek"
              link={"szemelyes-jovotervezes"}
              icon={<TiArrowRightOutline />}
              setImage={handleImageChange}
              image={Future}
              indx={3}
            />
          </div>
        )}
      </div>
      {needStat && (
        <div className="hero-jobb self-end mt-auto xl:mt-0 w-[100%] xl:w-[50%] flex flex-col 2xl:flex-row gap-[15px] p-[10px] relative z-20 items-end justify-center">
          <div className="text-[20px] flex flex-row gap-[5px] items-end">
            <span className="text-transparent font-bold text-[25px] md:text-5xl [-webkit-text-stroke:1px_#ffffff]">
              100+
            </span>
            <p>elégedett ügyfél</p>
          </div>
          <div className="text-[20px] flex flex-row gap-[5px] items-end">
            <span className="text-transparent font-bold text-[25px] md:text-5xl [-webkit-text-stroke:1px_#ffffff]">
              250+
            </span>
            <p>megkötött szerződés</p>
          </div>
        </div>
      )}
    </div>
  );
}
