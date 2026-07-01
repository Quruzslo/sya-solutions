'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import SectionTitles from '../sectionTitles'

export default function SectionTwo() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'center 50%'],
  })

  const scaleOszlop1 = useTransform(scrollYProgress, [0, 0.25], [0, 1])
  const scaleOszlop2 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const scaleOszlop3 = useTransform(scrollYProgress, [0.45, 0.75], [0, 1])

  const pathDraw = useTransform(scrollYProgress, [0.7, 1], [0, 1])

  const arrowOpacity = useTransform(scrollYProgress, [0.69, 0.7], [0, 1])

  return (
    <div className="w-[90%] max-w-[2560px] flex flex-col mx-auto py-[50px] relative">
      <SectionTitles title={'Hogyan dolgozunk érted?'} bgText={'Ismerd meg a folyamatot'} />

      <div className="w-full flex flex-col md:flex-row gap-[20px] my-[50px] h-full items-start">
        {/* BAL OLDAL */}
        <div className="w-full md:w-[50%] flex flex-col justify-between h-[80%] py-[5vh] pr-0 md:pr-10">
          <div className=" flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-pretty">
              A S.Y.A. Solutions egy magyar egyéni vállalkozókból álló csapat. Hivatásunk három
              alapfogalomra épült fel: biztonság (safety), hozam (yield), hozzáférhetőség
              (Accessibility). Ezek a pénzpiac alappillérei és a Mi feladatunk az, hogy a lehető
              legmagasabb százalékban meg tudjuk adni ezt Nektek. Fontos, hogy nálunk nem számít
              vállalkozó, alkalmazott, vagy cégtulaj vagy, a célunk, hogy ne kelljen többet aggódnod
              a pénz miatt és egy nyugodt, biztonságos jövőt építsünk fel együtt!
            </p>
          </div>

          <div className=" flex flex-col justify-center md:mt-[50px]">
            <p className="text-lg leading-relaxed text-pretty">
              A pénzügyi tanácsadás nálunk egy átlátható folyamat, amely segít a tudatos pénzügyi
              döntések meghozatalában. Első lépésként feltérképezzük az aktuális helyzetet és a
              célokat, majd ezek alapján személyre szabott javaslatokat készítünk a megfelelő
              pénzügyi megoldásokra. A közös munka nem ér véget a döntéssel: folyamatosan
              figyelemmel kísérjük a kialakított megoldásokat, és szükség esetén segítünk azok
              finomhangolásában, hogy mindig az élethelyzethez és célokhoz igazodjanak.
            </p>
          </div>
        </div>

        {/* JOBB OLDAL: ANIMÁLT DIV */}
        <div ref={sectionRef} className="w-full md:w-[50%] flex items-center justify-center">
          <div className="w-full max-w-md aspect-square flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 115 115"
              className="w-full h-full "
            >
              <g transform="translate(28.5, 15)">
                {/* 1. Oszlop - S (Safety / Biztonság) */}
                {/* 1. Oszlop */}
                <motion.rect
                  x="0"
                  y="50"
                  width="14"
                  height="35"
                  rx="4"
                  fill="#3f4603"
                  opacity="0.4"

                  style={{
                    scaleY: scaleOszlop1,
                    originY: 1,
                    filter: 'drop-shadow(0px 5px 2px rgba(0, 0, 0, 0.6))',
                  }}
                />

                {/* 2. Oszlop */}
                <motion.rect
                  x="22"
                  y="25"
                  width="14"
                  height="60"
                  rx="4"
                  fill="#3f4603"
                  opacity="0.7"
                  style={{
                    scaleY: scaleOszlop2,
                    originY: 1,
                    filter: 'drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.6))',
                  }}
                />

                {/* 3. Oszlop */}
                <motion.rect
                  x="44"
                  y="0"
                  width="14"
                  height="85"
                  rx="4"
                  fill="#3f4603"
                  style={{
                    scaleY: scaleOszlop3,
                    originY: 1,
                    filter: 'drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.6))',
                  }}
                />

                {/* Az 'S' alakú trendvonal */}
                <motion.path
                  d="M -10 75 C 12 75, 18 15, 60 15"
                  fill="none"
                  stroke="#bfa06a"
                  strokeWidth="5"
                  strokeLinecap="round"
                  // Átlátszóság hozzáadva a stílushoz
                  style={{ pathLength: pathDraw, opacity: arrowOpacity }}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
