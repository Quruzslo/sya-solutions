"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionTitles from "../sectionTitles";

// --- ADAT OBJEKTUMOK ---

const PROCESS_STEPS = [
  {
    id: 1,
    title: "Alapos helyzetfelmérés:",
    description:
      "Első lépésként feltérképezzük a jelenlegi anyagi helyzetedet, és megismerjük a rövid, illetve hosszú távú céljaidat.",
  },
  {
    id: 2,
    title: "Személyre szabott stratégia:",
    description:
      "A kapott információk alapján egyedi javaslatokat és a számodra legmegfelelőbb pénzügyi megoldásokat dolgozzuk ki.",
  },
  {
    id: 3,
    title: "Közös döntéshozatal:",
    description:
      "Érthetően, szakzsargonok nélkül átbeszéljük a lehetőségeket, hogy tudd, pontosan mibe fekteted a bizalmadat és a pénzedet.",
  },
  {
    id: 4,
    title: "Folyamatos utánkövetés és finomhangolás:",
    description:
      "A mi munkánk nem ér véget a döntéssel. Rendszeresen figyelemmel kísérjük az elindított programokat, és ha az élethelyzeted vagy a piaci környezet változik, azonnal segítünk a portfóliód optimalizálásában.",
  },
];

const PHILOSOPHY_PILLARS = [
  {
    id: "safety",
    title: "Safety (Biztonság):",
    description: "Kiszámítható, stabil alapok megteremtése a pénzügyeidben.",
  },
  {
    id: "yield",
    title: "Yield (Hozam):",
    description:
      "A megtakarításaid értékének és gyarapodásának maximalizálása.",
  },
  {
    id: "accessibility",
    title: "Accessibility (Hozzáférhetőség):",
    description: "Átlátható, rugalmas és bármikor elérhető megoldások.",
  },
];

const SECTION_TEXTS = {
  processTitle: "Átlátható pénzügyi tanácsadás – Lépésről lépésre",
  processDescription:
    "Nálunk a tanácsadás nem egy egyszeri alkalom, hanem egy partneri folyamat, amely a tudatos döntések meghozatalát támogatja. Így zajlik a közös munka:",
  philosophyTitle: "Filozófiánk",
  philosophyDescription:
    "Hivatásunk és nevünk a pénzpiac három legfontosabb alappillérére épül:",
  footerIntro:
    "Célunk, hogy a lehető legmagasabb szinten biztosítsuk számodra ezeket az értékeket. Legyél alkalmazott, egyéni vállalkozó vagy cégtulajdonos, a küldetésünk közös:",
  footerHighlight:
    "segítünk, hogy ne kelljen többé a pénz miatt aggódnod, és egy anyagilag független, nyugodt jövőt építhessünk fel együtt!",
};

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

  // SVG Oszlopok adat-összerendelése az animációkkal
  const svgColumns = [
    {
      id: "col-1",
      x: "0",
      y: "50",
      width: "14",
      height: "35",
      opacity: "0.4",
      scale: scaleOszlop1,
      label: "SAFETY",
      textSize: "text-[8px]",
    },
    {
      id: "col-2",
      x: "22",
      y: "25",
      width: "14",
      height: "60",
      opacity: "0.7",
      scale: scaleOszlop2,
      label: "YIELD",
      textSize: "text-[8px]",
    },
    {
      id: "col-3",
      x: "44",
      y: "0",
      width: "14",
      height: "85",
      opacity: undefined,
      scale: scaleOszlop3,
      label: "ACCESSIBILITY",
      textSize: "text-[7px]",
    },
  ];

  return (
    <div className="w-[90%] max-w-[2560px] flex flex-col mx-auto relative">
      <SectionTitles
        title={"Hogyan dolgozunk érted?"}
        bgText={"Ismerd meg a folyamatot"}
      />

      <div className="w-full flex flex-col md:flex-row gap-[20px] h-full">
        {/* BAL OLDAL */}
        <div className="w-full md:w-[50%] flex flex-col justify-between py-[5vh] pr-0 md:pr-10">
          <div className="flex flex-col justify-center md:my-6">
            <h3 className="font-bold my-6 tracking-wide bg-zold text-feher p-2 rounded-md w-fit shadow-[10px_10px_10px_0px_rgba(0,0,0,0.4)]">
              {SECTION_TEXTS.processTitle}
            </h3>
            <p className="text-lg leading-relaxed text-pretty mb-6 text-gray-700">
              {SECTION_TEXTS.processDescription}
            </p>

            {/* Rendezett lista */}
            <ol className="space-y-4">
              {PROCESS_STEPS.map((step) => (
                <li
                  key={step.id}
                  className="flex flex-col items-start gap-4 p-3 rounded-lg transition-colors duration-200"
                >
                  <div className="flex flex-row gap-[10px] bg-zold/20 p-[10px] rounded-full items-center justify-center">
                    <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-white text-zold font-bold text-sm ">
                      {step.id}
                    </span>
                    <p className="text-zold font-black">{step.title}</p>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed pt-0.5">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="font-bold mb-4 text-feher bg-zold p-2 rounded-md w-fit shadow-[10px_10px_10px_0px_rgba(0,0,0,0.4)]">
              {SECTION_TEXTS.philosophyTitle}
            </h3>
            <p className="text-lg leading-relaxed text-pretty mb-2">
              {SECTION_TEXTS.philosophyDescription}
            </p>

            <ul className="space-y-4 mb-6">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                <li
                  key={pillar.id}
                  className="flex items-start gap-3 p-3 rounded-lg transition-colors duration-200"
                >
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
                  <span className="text-lg text-text-alap leading-relaxed">
                    <strong className="text-[#3f4603] font-semibold border-b-2 border-[#3f4603]/20 pb-0.5 mr-1">
                      {pillar.title}
                    </strong>{" "}
                    {pillar.description}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-lg leading-relaxed text-pretty text-feher bg-zold p-4 rounded-xl">
              {SECTION_TEXTS.footerIntro}{" "}
              <strong className="text-feher font-bold">
                {SECTION_TEXTS.footerHighlight}
              </strong>
            </p>
          </div>
        </div>

        {/* JOBB OLDAL */}
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
                {/* Oszlopok mapelése */}
                {svgColumns.map((col) => (
                  <g key={col.id}>
                    <motion.rect
                      x={col.x}
                      y={col.y}
                      width={col.width}
                      height={col.height}
                      rx="4"
                      fill="#3f4603"
                      opacity={col.opacity}
                      style={{
                        scaleY: col.scale,
                        originY: 1,
                        filter: "drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.6))",
                      }}
                    />
                    <motion.foreignObject
                      x={col.x}
                      y={col.y}
                      width={col.width}
                      height={col.height}
                      style={{ scaleY: col.scale, originY: 1 }}
                    ></motion.foreignObject>
                  </g>
                ))}

                {/* Az 'S' alakú trendvonal */}
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
