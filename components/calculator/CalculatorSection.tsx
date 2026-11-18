"use client";
import SectionTitles from "../sectionTitles";
import Image from "next/image";
import Link from "next/link";
import { AiFillCalculator } from "react-icons/ai";
import { PiExclamationMarkFill } from "react-icons/pi";
import { useState } from "react";

type Tab = "nyugdij" | "egeszseg";

export default function CalculatorSection() {
  const [active, setActive] = useState<Tab>("nyugdij");

  return (
    <section className="my-[50px] flex w-full flex-col">
      <div className="mx-auto flex w-[90%] flex-col">
        <SectionTitles title={"Velünk számolhatsz!"} bgText={"Kalkulátorunk"} />

        <div className="flex flex-col md:flex-row w-fit gap-[10px] items-center justify-center mb-[15px]  ">
          <PiExclamationMarkFill size={35} />
          <p className="text-[15px]">
            {" "}
            A kalkuláció nem teljes értékű kiértékelés. A személyreszabott,
            ingyenes segítségért kérj konzultációt a{" "}
            <a
              href="/kapcsolat"
              className="bg-zold text-white py-[5px] px-[10px] shadow-md rounded-full mr-[5px]"
            >
              kapcsolat fülön
            </a>
            !
          </p>
        </div>

        <div className="relative flex w-full flex-col overflow-hidden rounded-[14px] shadow-[0px_10px_25px_rgba(0,0,0,0.35)] md:min-h-[500px] md:flex-row">
          {/* Selymesen úszó háttérképek */}
          <Image
            src="/images/nyugdíjkalkuláció.jpg"
            alt="Nyugdíjkiegészítési kockázati térkép"
            fill
            className={`object-cover transition-all duration-700 ${
              active === "nyugdij"
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
          />
          <Image
            src="/images/egeszsegbiztositas.jpg"
            alt="Egészségbiztosítási kockázati térkép"
            fill
            className={`object-cover transition-all duration-700 ${
              active === "egeszseg"
                ? "scale-100 opacity-100"
                : "scale-105 opacity-0"
            }`}
          />

          {/* Állandó alsó sötétítés */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />

          {/* Bal oldal ---- */}
          <div
            onMouseEnter={() => setActive("nyugdij")}
            className={`group relative z-10 flex min-h-[420px] w-full flex-col justify-end border-b border-white/15 p-6 transition-colors duration-500 md:min-h-[500px] md:w-1/2 md:border-b-0 md:border-r md:p-8 ${
              active === "nyugdij" ? "bg-black/0" : "bg-black/45"
            }`}
          >
            <div className="flex flex-col gap-3 text-white transition-transform duration-300 group-hover:-translate-y-1">
              <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[12px] font-semibold backdrop-blur-sm">
                Jövőtervezés
              </span>

              <h3 className="text-[26px] font-bold leading-tight md:text-[30px]">
                Nyugdíjkiegészítési kockázati térkép
              </h3>

              <p className="text-[15px] leading-relaxed text-white/85">
                Mennyi állami nyugdíjra számíthatsz reálisan, és mekkora lesz a
                kieső jövedelmed? Egy 3 perces, őszinte kalkulációval azonnal
                látod a várható nyugdíjrést, és azt, hogyan védekezhetsz az
                infláció és az elértéktelenedés ellen.
              </p>

              <Link
                href="/kalkulator/nyugdij"
                className="mt-2 flex w-fit flex-row items-center justify-center gap-2.5 rounded-full backdrop-blur-sm px-6 py-3 text-[17px] font-bold text-arany hover:shadow-md transition-all duration-300 hover:bg-arany hover:text-white"
              >
                <span>Kalkulálok</span>
                <AiFillCalculator size={20} />
              </Link>
            </div>
          </div>

          {/* Jobb oldal ---- */}
          <div
            onMouseEnter={() => setActive("egeszseg")}
            className={`group relative z-10 flex min-h-[420px] w-full flex-col justify-end p-6 transition-colors duration-500 md:min-h-[500px] md:w-1/2 md:p-8 ${
              active === "egeszseg" ? "bg-black/0" : "bg-black/45"
            }`}
          >
            <div className="flex flex-col gap-3 text-white transition-transform duration-300 group-hover:-translate-y-1">
              <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[12px] font-semibold  backdrop-blur-sm">
                Védelem
              </span>

              <h3 className="text-[26px] font-bold leading-tight md:text-[30px]">
                Egészségbiztosítási kockázati térkép
              </h3>

              <p className="text-[15px] leading-relaxed text-white/85">
                Ez a gyors, 5 perces előszűrés megmutatja, mennyire vagy
                pénzügyileg védett váratlan betegség, baleset vagy hosszabb
                munkaképtelenség esetén. Nem biztosítási ajánlat és nem
                tanácsadás – hanem egy őszinte helyzetkép arról, rendben vagy-e,
                vagy érdemes lépned.
              </p>

              <Link
                href="/"
                className="mt-2 flex w-fit flex-row items-center justify-center gap-2.5 rounded-full backdrop-blur-sm px-6 py-3 text-[17px] font-bold text-arany hover:shadow-md transition-all duration-300 hover:bg-arany hover:text-white"
              >
                <span title="Hamarosan...">Kalkulálok</span>
                <AiFillCalculator size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
