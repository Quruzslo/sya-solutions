'use client'
import Image from 'next/image'
import Family from 'public/images/freedom-familyHQ.jpg'
import Engineer from 'public/images/car-engineerHQ.jpg'
import Future from 'public/images/futureHQ.jpg'

import HeroButton from './heroButton'
import { useState } from 'react'
import { TiArrowRightOutline } from 'react-icons/ti'

export default function Hero() {
  const [heroImage, setHeroImage] = useState(Family)
  const [prevImage, setPrevImage] = useState(null)
  const [currentKey, setCurrentKey] = useState(1)
  const [animationClass, setAnimationClass] = useState('animate-slide-in-left')

  const handleImageChange = (newImage, targetKey) => {
    if (newImage.src === heroImage.src) return

    if (targetKey > currentKey) {
      setAnimationClass('animate-slide-in-right')
    } else {
      setAnimationClass('animate-slide-in-left')
    }

    setPrevImage(heroImage)
    setHeroImage(newImage)
    setCurrentKey(targetKey)
  }

  return (
    <div className="hero w-[90%] max-w-[1800px] rounded-[20px] flex flex-col md:flex-row mx-auto py-[50px] mt-[120px] bg-transparent text-white relative overflow-hidden h-[calc(100vh-150px)] min-h-[650px]">
      {/* HÁTTÉRKÉP CONTAINER */}
      <div className="absolute top-0 left-0 w-full h-full hero-kep rounded-[20px] overflow-hidden bg-zold">
        {prevImage && (
          <Image
            key={`prev-${currentKey}`}
            src={prevImage}
            alt="Pénzügy támogatás vállalkozásokhoz, családoknak és magánszemélyeknek."
            fill
            className="object-cover object-center z-0"
          />
        )}

        {/* FELSŐ RÉTEG -  Rácsúszik az alsóra */}
        <Image
          key={`current-${currentKey}`}
          src={heroImage}
          alt="Pénzügyi biztonság a családnak."
          fill
          priority
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1800px"
          className={`object-cover object-center z-10 ${animationClass}`}
        />
      </div>

      {/* TARTALOM */}
      <div className="hero-bal w-[100%] md:w-[50%] flex flex-col p-[10px] relative z-20">
        <p className="text-zold text-[40px] ml-[-10px] bg-feher w-fit px-[15px] rounded-r-[20px] font-bold">
          S.Y.A Solutions
        </p>
        <h1 className="!text-[40px] font-bold my-auto">Megbízható pénzügyi védőháló </h1>

        <div className="flex flex-row wrap gap-3">
          <HeroButton
            title="Családomnak"
            icon={<TiArrowRightOutline />}
            setImage={(img) => handleImageChange(img, 1)}
            image={Family}
          />

          <HeroButton
            title="Vállalkozásomnak"
            icon={<TiArrowRightOutline />}
            setImage={(img) => handleImageChange(img, 2)}
            image={Engineer}
          />

          <HeroButton
            title="Jövőmnek"
            icon={<TiArrowRightOutline />}
            setImage={(img) => handleImageChange(img, 3)}
            image={Future}
          />
        </div>
      </div>

      <div className="hero-jobb w-[100%] md:w-[50%] flex flex-col p-[10px] relative z-20">
        <p>Hero jobb oldala</p>
      </div>
    </div>
  )
}
