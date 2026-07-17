"use client";
import { useState, useEffect, useRef } from "react";

import ContactForm from "../../components/contactForm/contactForm";
import Link from "next/link";
import Image from "next/image";
import SectionTitles from "../../components/sectionTitles";

// Ikonok---------------
import { IoMailUnreadOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";
import { LuBriefcase, LuPhone } from "react-icons/lu";

// Képek ----------------------
import Vió from "../../public/images/Viola.jpg";
import Zsó from "../../public/images/zso.jpg";
import Zsani from "../../public/images/Zsanipic.jpg";
import Dani from "../../public/images/danikep.jpg";

const Members = [
  {
    name: "Vincze Viola",
    photo: Vió,
    title: "Fiókvezető",
    tel: "+36201234567",
  },
  {
    name: "Szőgyényi Zsófia",
    photo: Zsó,
    title: "Vezető tanácsadó",
    tel: "+36303694251",
  },
  {
    name: "Szabó Zsanett",
    photo: Zsani,
    title: "Tanácsadó",
    tel: "+36201234567",
  },
  {
    name: "Kiss Dániel",
    photo: Dani,
    title: "Tancsadó",
    tel: "+36201234567",
  },
];

const Advantages = [
  {
    id: "01",
    title: "Teljes piaci rálátás",
    subtitle: '(nincs „csőlátás")',
  },
  {
    id: "02",
    title: "Valódi objektivitás",
    subtitle: "(nincs részrehajlás)",
  },
  {
    id: "03",
    title: "Személyre szabott csomag",
    subtitle: "(csak amire szükséged van)",
  },
  {
    id: "04",
    title: "Átlátható tervezés",
    subtitle: "(rejtett költségek nélkül)",
  },
];

export default function ContactPage() {
  const [activeMemberIdx, setActiveMemberIdx] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveMemberIdx(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleToggle = (idx) => {
    setActiveMemberIdx(activeMemberIdx === idx ? null : idx);
  };

  return (
    <section className="w-[90%] max-w-[2560px] mx-auto flex flex-col min-h-[100vh] py-[120px]">
      <SectionTitles
        title={"Keress minket bizalomal"}
        bgText={"KAPCSOLAT"}
      ></SectionTitles>
      <div className="w-full flex flex-col md:flex-row mt-[50px] gap-[15px]">
        {/* BAL OLDAL --------------------------- */}
        <div className="bal-contact w-[90%]  md:w-1/2 flex flex-col border-4 border-zold rounded-md relative p-[10px] min-h-[450px] pr-[75px] xl:pr-[100px] mr-[50px] xl:mr-0">
          <h1 className="mt-[-27px] xl:mt-[-40px] !text-[15px] xl:!text-[30px] text-zold font-bold font-mono bg-feher w-fit p-[5px]">
            Független pénzügyi szakértelem
          </h1>
          <div className="mx-auto w-full ">
            <div className="divide-y divide-stone-200">
              <div className="flex flex-col gap-4">
                {Advantages.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex p-[10px] w-fit flex-col md:flex-row gap-2 border-l-2 border-transparent transition-colors duration-300 hover:border-zold hover:bg-stone-50/60 motion-reduce:transition-none"
                  >
                    <p className="font-mono text-sm tracking-wider text-stone-400 transition-colors duration-300 group-hover:text-zold motion-reduce:transition-none">
                      {item.id}
                    </p>
                    <div>
                      <h3 className="!text-[15px] font-bold text-stone-900">
                        {item.title}{" "}
                        <span className="font-normal text-stone-400">
                          {item.subtitle}
                        </span>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tagok képei --------------------- */}
          <div className="absolute right-[-40px] xl:right-[-60px] top-0 flex h-full w-fit flex-col justify-between py-[10px]">
            {Members.map((member, idx) => {
              const isActive = activeMemberIdx === idx;

              return (
                <div key={idx} className="relative flex flex-col items-center">
                  {/* 1. Kép konténer */}
                  <div
                    onClick={() => handleToggle(idx)}
                    className="peer relative z-10 h-[80px] w-[80px] xl:h-[120px] xl:w-[120px] cursor-pointer overflow-hidden rounded-full border-[3px] border-zold shadow-sm transition-transform duration-300 hover:scale-105"
                  >
                    <Image
                      src={member.photo}
                      alt={member.name || "Profilkép"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* 2. Dropdown / Tooltip konténer */}
                  <div
                    className={`pointer-events-none absolute top-[92px] xl:top-[132px]  md:left-1/2 z-20 w-[190px] -translate-x-[25%] md:-translate-x-1/2 -translate-y-1 rounded-md border border-zold/15 bg-white p-4 opacity-0 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out
          peer-hover:translate-y-0 peer-hover:opacity-100
          ${isActive ? "translate-y-0 opacity-100" : ""}`}
                  >
                    {/* kis nyíl az avatar felé */}
                    <span className="absolute -top-1.5 left-3/4 md:left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-zold/15 bg-white" />

                    <p className="font-semibold tracking-tight text-zinc-900">
                      {member.name}
                    </p>

                    <div className="mt-2 space-y-1.5 border-t border-zinc-100 pt-2">
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <LuBriefcase size={13} className="shrink-0 text-zold" />
                        <span>{member.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <LuPhone size={13} className="shrink-0 text-zold" />
                        <span className="font-mono">{member.tel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alsó szekció balon ----------- */}
          <div className="flex flex-col w-full xl:w-1/2 items-center justify-center gap-4 mt-auto">
            <div className="w-full">
              <Link
                href="mailto:buliii1010@gmail.com"
                className="group relative flex flex-row items-center justify-between
             w-full p-[5px] rounded-full overflow-hidden
             border border-zold bg-transparent
             text-slate-700 hover:text-slate-900
             transition-colors duration-300
             before:content-[''] before:absolute before:inset-0
             before:bg-zold before:translate-x-full
             before:transition-transform before:duration-300 before:ease-out
             hover:before:translate-x-0"
              >
                <span
                  className="relative z-10 flex items-center justify-center shrink-0
                 w-8 h-8 rounded-full border border-feher bg-zold text-white text-xl
                 group-hover:text-feher transition-colors duration-300"
                >
                  <IoMailUnreadOutline />
                </span>
                <p className="relative z-10 font-bold group-hover:text-feher px-2 text-center flex-1 min-w-0 truncate">
                  buliii1010@gmail.com
                </p>

                <div className="w-8 h-8 shrink-0 relative z-10 pointer-events-none" />
              </Link>
            </div>

            <div className="w-full">
              <Link
                href="tel:+36303694251"
                className="group relative flex flex-row items-center justify-between
             w-full p-[5px] rounded-full overflow-hidden
             border border-zold bg-transparent
             text-slate-700 hover:text-slate-900
             transition-colors duration-300
             before:content-[''] before:absolute before:inset-0
             before:bg-zold before:translate-x-full
             before:transition-transform before:duration-300 before:ease-out
             hover:before:translate-x-0"
              >
                <span
                  className="relative z-10 flex items-center justify-center shrink-0
                 w-8 h-8 rounded-full border border-feher bg-zold text-white text-xl
                 group-hover:text-feher transition-colors duration-300"
                >
                  <LuPhoneCall />
                </span>
                <p className="relative z-10 font-bold group-hover:text-feher px-2 text-center flex-1 min-w-0 truncate">
                  +36 30 369 4251
                </p>

                <div className="w-8 h-8 shrink-0 relative z-10 pointer-events-none" />
              </Link>
            </div>

            <div className="w-full">
              <Link
                target="blank"
                href="https://maps.app.goo.gl/4am1hSoRMnsGfnNU6"
                className="group relative flex flex-row items-center justify-between
             w-full p-[5px] rounded-full overflow-hidden
             border border-zold bg-transparent
             text-slate-700 hover:text-slate-900
             transition-colors duration-300
             before:content-[''] before:absolute before:inset-0
             before:bg-zold before:translate-x-full
             before:transition-transform before:duration-300 before:ease-out
             hover:before:translate-x-0"
              >
                <span
                  className="relative z-10 flex items-center justify-center shrink-0
                 w-8 h-8 rounded-full border border-feher bg-zold text-white text-xl
                 group-hover:text-feher transition-colors duration-300"
                >
                  <FaMapLocationDot />
                </span>
                <p className="relative z-10 font-bold group-hover:text-feher px-2 text-center flex-1 min-w-0 ">
                  Budapest, Gombocz Zoltán u. 8b
                </p>

                <div className="w-8 h-8 shrink-0 relative z-10 pointer-events-none" />
              </Link>
            </div>
            <div className="flex flex-row gap-3 w-full">
              <Link href="https://www.facebook.com/zsofia.szogyenyi">
                <FaFacebookF
                  size={30}
                  className="text-feher bg-zold p-[5px] rounded-full"
                />
              </Link>
              <Link href="https://www.facebook.com/zsofia.szogyenyi">
                <FaInstagram
                  size={30}
                  className="text-feher bg-zold p-[5px] rounded-full"
                />
              </Link>
              <Link href="https://sya-solutions.vercel.app/">
                <CiGlobe
                  size={30}
                  className="text-feher bg-zold p-[5px] rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* JOBB OLDAL -------------------------------- */}
        <div className="jobb-contact w-full md:w-1/2 flex flex-col xl:flex-row gap-[15px] ">
          <div className="flex flex-col md:flex-row w-full  md:w-[80%] ml-auto">
            <ContactForm></ContactForm>
          </div>
        </div>
      </div>
      {/* Térkép konti ----------------- */}

      <div className="w-full mt-[50px] rounded-xl shadow-xl">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.2613991511735!2d19.030972512400925!3d47.48482087105866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc338432bfe7%3A0xacec37d0cfb14949!2sBudapest%2C%20Gombocz%20Zolt%C3%A1n%20u.%208b%2C%201118!5e0!3m2!1shu!2shu!4v1784216553786!5m2!1shu!2shu"
          width="600"
          height="450"
          allowFullScreen=""
          className="w-full rounded-xl"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </section>
  );
}
