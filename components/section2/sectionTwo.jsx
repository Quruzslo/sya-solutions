"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionTitles from "../sectionTitles";

export default function SectionTwo() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 40%"],
  });

  // animációs logikák
  const scaleOszlop1 = useTransform(scrollYProgress, [0.3, 0.75], [0, 1]);
  const scaleOszlop2 = useTransform(scrollYProgress, [0.3, 0.75], [0, 1]);
  const scaleOszlop3 = useTransform(scrollYProgress, [0.45, 0.95], [0, 1]);

  const pathDraw = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  const arrowOpacity = useTransform(scrollYProgress, [0.71, 0.75], [0, 1]);

  return (
    <div className="w-[90%] max-w-[2560px] flex flex-col mx-auto relative">
      <SectionTitles
        title={"Hogyan dolgozunk érted?"}
        bgText={"Ismerd meg a folyamatot"}
      />

      <div className="w-full flex flex-col md:flex-row gap-[20px] h-full ">
        {/* BAL OLDAL  */}
        <div className="w-full md:w-[50%] flex flex-col justify-between py-[5vh] pr-0 md:pr-10">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 text-[#3f4603]">
              A S.Y.A. Solutions filozófiája
            </h3>
            <p className="text-lg leading-relaxed text-pretty mb-2">
              Hivatásunk és nevünk a pénzpiac három legfontosabb alappillérére
              épül:
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="mt-1 flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-[#3f4603]/10 text-[#3f4603]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-[#3f4603] font-semibold border-b-2 border-[#3f4603]/20 pb-0.5 mr-1">
                    Safety (Biztonság):
                  </strong>{" "}
                  Kiszámítható, stabil alapok megteremtése a pénzügyeidben.
                </span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="mt-1 flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-[#3f4603]/10 text-[#3f4603]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-[#3f4603] font-semibold border-b-2 border-[#3f4603]/20 pb-0.5 mr-1">
                    Yield (Hozam):
                  </strong>{" "}
                  A megtakarításaid értékének és gyarapodásának maximalizálása.
                </span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="mt-1 flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-[#3f4603]/10 text-[#3f4603]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="3"
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span className="text-lg text-gray-700 leading-relaxed">
                  <strong className="text-[#3f4603] font-semibold border-b-2 border-[#3f4603]/20 pb-0.5 mr-1">
                    Accessibility (Hozzáférhetőség):
                  </strong>{" "}
                  Átlátható, rugalmas és bármikor elérhető megoldások.
                </span>
              </li>
            </ul>

            <p className="text-lg leading-relaxed text-pretty text-gray-700 bg-gray-50 p-4 rounded-xl  border-[#3f4603] shadow-2xl">
              Célunk, hogy a lehető legmagasabb szinten biztosítsuk számodra
              ezeket az értékeket. Legyél alkalmazott, egyéni vállalkozó vagy
              cégtulajdonos, a küldetésünk közös:{" "}
              <strong className="text-[#3f4603] font-bold">
                segítünk, hogy ne kelljen többé a pénz miatt aggódnod, és egy
                anyagilag független, nyugodt jövőt építhessünk fel együtt!
              </strong>
            </p>
          </div>

          <div className="flex flex-col justify-center md:mt-6">
            <h3 className="text-2xl font-bold my-6 text-[#3f4603] tracking-wide">
              Átlátható pénzügyi tanácsadás – Lépésről lépésre
            </h3>
            <p className="text-lg leading-relaxed text-pretty mb-6 text-gray-700">
              Nálunk a tanácsadás nem egy egyszeri alkalom, hanem egy partneri
              folyamat, amely a tudatos döntések meghozatalát támogatja. Így
              zajlik a közös munka:
            </p>

            {/* Rendezett lista  */}
            <ol className="space-y-4">
              <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#3f4603] text-white font-bold text-sm shadow-md shadow-[#3f4603]/20">
                  1
                </span>
                <span className="text-lg text-gray-700 leading-relaxed pt-0.5">
                  <strong className="text-[#3f4603] font-semibold block mb-0.5">
                    Alapos helyzetfelmérés:
                  </strong>{" "}
                  Első lépésként feltérképezzük a jelenlegi anyagi helyzetedet,
                  és megismerjük a rövid, illetve hosszú távú céljaidat.
                </span>
              </li>
              <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#3f4603] text-white font-bold text-sm shadow-md shadow-[#3f4603]/20">
                  2
                </span>
                <span className="text-lg text-gray-700 leading-relaxed pt-0.5">
                  <strong className="text-[#3f4603] font-semibold block mb-0.5">
                    Személyre szabott stratégia:
                  </strong>{" "}
                  A kapott információk alapján egyedi javaslatokat és a számodra
                  legmegfelelőbb pénzügyi megoldásokat dolgozzuk ki.
                </span>
              </li>
              <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#3f4603] text-white font-bold text-sm shadow-md shadow-[#3f4603]/20">
                  3
                </span>
                <span className="text-lg text-gray-700 leading-relaxed pt-0.5">
                  <strong className="text-[#3f4603] font-semibold block mb-0.5">
                    Közös döntéshozatal:
                  </strong>{" "}
                  Érthetően, szakzsargonok nélkül átbeszéljük a lehetőségeket,
                  hogy tudd, pontosan mibe fekteted a bizalmadat és a pénzedet.
                </span>
              </li>
              <li className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#3f4603] text-white font-bold text-sm shadow-md shadow-[#3f4603]/20">
                  4
                </span>
                <span className="text-lg text-gray-700 leading-relaxed pt-0.5">
                  <strong className="text-[#3f4603] font-semibold block mb-0.5">
                    Folyamatos utánkövetés és finomhangolás:
                  </strong>{" "}
                  A mi munkánk nem ér véget a döntéssel. Rendszeresen
                  figyelemmel kísérjük az elindított programokat, és ha az
                  élethelyzeted vagy a piaci környezet változik, azonnal
                  segítünk a portfóliód optimalizálásában.
                </span>
              </li>
            </ol>
          </div>
        </div>

        {/* JOBB OLDAL*/}
        <div
          ref={sectionRef}
          className="w-full md:w-[50%] relative items-start flex flex-col"
        >
          <div className="w-full max-w-md aspect-square mx-auto flex items-center justify-center md:sticky md:top-[130px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 115 115"
              className="w-full h-full"
            >
              <g transform="translate(28.5, 15)">
                {/* 1. Oszlop - Eredeti */}
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
                    filter: "drop-shadow(0px 5px 2px rgba(0, 0, 0, 0.6))",
                  }}
                />
                {/* ÚJ: 1. Oszlop szöveg overlay (Safety) */}
                <motion.foreignObject
                  x="0"
                  y="50"
                  width="14"
                  height="35"
                  style={{ scaleY: scaleOszlop1, originY: 1 }}
                >
                  {/* <div className="h-full w-full flex items-end justify-center overflow-hidden">
                    <span
                      className="text-feher font-bold text-[8px] tracking-wider my-1"
                      style={{
                        writingMode: "vertical-rl",
                        whiteSpace: "nowrap",
                      }}
                    >
                      SAFETY
                    </span>
                  </div> */}
                </motion.foreignObject>

                {/* 2. Oszlop - Eredeti */}
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
                    filter: "drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.6))",
                  }}
                />
                {/* ÚJ: 2. Oszlop szöveg overlay (Yield) */}
                <motion.foreignObject
                  x="22"
                  y="25"
                  width="14"
                  height="60"
                  style={{ scaleY: scaleOszlop2, originY: 1 }}
                >
                  {/* <div className="h-full w-full flex items-end justify-center overflow-hidden">
                    <span
                      className="text-feher font-bold text-[8px] tracking-wider mb-1"
                      style={{
                        writingMode: "vertical-rl",
                        whiteSpace: "nowrap",
                      }}
                    >
                      YIELD
                    </span>
                  </div> */}
                </motion.foreignObject>

                {/* 3. Oszlop - Eredeti */}
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
                    filter: "drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.6))",
                  }}
                />
                {/* ÚJ: 3. Oszlop szöveg overlay (Accessibility) */}
                <motion.foreignObject
                  x="44"
                  y="0"
                  width="14"
                  height="85"
                  style={{ scaleY: scaleOszlop3, originY: 1 }}
                >
                  {/* <div className="h-full w-full flex items-end justify-center overflow-hidden">
                    <span
                      className="text-feher font-bold text-[7px] tracking-wider mb-1"
                      style={{
                        writingMode: "vertical-rl",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ACCESSIBILITY
                    </span>
                  </div> */}
                </motion.foreignObject>

                {/* Az 'S' alakú trendvonal - Eredeti */}
                <motion.path
                  d="M -10 75 C 12 75, 18 15, 60 15"
                  fill="none"
                  stroke="#bfa06a"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength="1"
                  style={{
                    pathLength: pathDraw,
                    opacity: arrowOpacity,
                  }}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
