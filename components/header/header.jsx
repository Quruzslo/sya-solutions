"use client";
import navItems from "@/lib/navItems";
import SyaLogo from "./syaLogo";
import Link from "next/link";
import { SiMinutemailer } from "react-icons/si";

import { useEffect, useState } from "react";

export default function Header() {
  const [activeHeader, setActiveHeader] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setActiveHeader(true);
      } else {
        setActiveHeader(false);
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setHasRendered(true);

    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const htmlElem = document.documentElement;

    if (isMenuOpen) {
      htmlElem.style.overflow = "hidden";
    } else {
      htmlElem.style.overflow = "";
    }

    return () => {
      htmlElem.style.overflow = "";
    };
  }, [isMenuOpen]);

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index, e) => {
    e.preventDefault();
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <>
      <section className="w-full fixed top-0 left-0 flex flex-col justify-center items-center z-[999]">
        <header
          className={`flex flex-row max-w-[2560px] w-[90%] h-[75px] md:h-[100px] p-[10px] items-center

            transition-all duration-500 ease-in-out

            ${
              activeHeader && !isMenuOpen
                ? "rounded-[50px] bg-black/50 backdrop-blur-md shadow-sm mt-2 md:mt-4"
                : "rounded-none bg-transparent mt-0"
            }`}
        >
          {/* Logo Container */}

          <div className="w-fit h-fit min-w-[75px] max-h-[75px] xl:max-h-[100px] relative z-50">
            <Link
              href="/"
              className="z-50"
              aria-label="Független pénzügyi tanácsadás, hogy a teljes piac legjobb ajánlatait adhassuk ügyfeleinknek!"
            >
              <SyaLogo activeHeader={activeHeader || isMenuOpen} />
            </Link>
          </div>

          {/* Menü Gomb  */}

          <button
            onClick={toggleMenu}
            className="ml-auto w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 relative group cursor-pointer overflow-hidden"
            aria-label="Menü megnyitása"
          >
            <span
              className={`block h-[4px] rounded-full w-8 bg-[#3f4603] transition-all duration-300 ease-in-out

                ${isMenuOpen ? "rotate-45 translate-y-2 bg-arany" : ""}

                ${activeHeader && !isMenuOpen ? "bg-white" : ""}`}
            />

            <span
              className={`block h-[4px] rounded-full w-8 bg-[#3f4603] transition-all duration-300 ease-in-out

                ${isMenuOpen ? "translate-x-[50px]" : "translate-x-[0px]"}

                ${activeHeader && !isMenuOpen ? "bg-white" : ""}`}
            />

            <span
              className={`block h-[4px] rounded-full w-8 bg-[#3f4603] transition-all duration-300 ease-in-out

                ${isMenuOpen ? "-rotate-45 -translate-y-2 bg-arany" : ""}

                ${activeHeader && !isMenuOpen ? "bg-white" : ""}`}
            />
          </button>
        </header>
      </section>

      {/* OVERLAY  */}
      <div
        className={`fixed inset-0 w-full h-[100dvh] z-[998]
          ${!hasRendered ? "hidden" : ""} 
          ${isMenuOpen ? "pointer-events-auto overflow-y-auto overflow-x-hidden" : "pointer-events-none overflow-hidden"}`}
      >
        {/* BELSŐ RUGALMAS KONTÉNER */}
        <div className="w-full min-h-full flex flex-col md:flex-row">
          {/* BAL PANEL */}
          <div
            className={`w-full md:w-1/2 flex-1 md:flex-none min-h-[300px] md:min-h-[420px] bg-[#3f4603] flex flex-col justify-center items-center px-10 pt-[120px] pb-10 md:py-0 relative shrink-0
              ${isMenuOpen ? "panel-left-open" : "panel-left-close"}`}
          >
            <div
              className={`transition-opacity duration-700 delay-300 flex flex-col items-center ${
                isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="!text-[25px] md:!text-3xl font-bold text-[#e7ebe3] mb-4 text-center leading-tight">
                S.Y.A.
                <br />
                Solutions
              </h2>
              <p className="text-[#e7ebe3]/70 text-base md:text-xl text-start max-w-sm">
                Megbízható szakmai háttérrel segítünk kiválasztani a piacon
                elérhető legkedvezőbb pénzügyi megoldásokat. Építs stabil anyagi
                jövőt magánszemélyként vagy vállalkozóként!
              </p>
            </div>
          </div>

          {/* JOBB PANEL */}
          <div
            className={`w-full md:w-1/2 flex-1 md:flex-none min-h-[420px] bg-[#e7ebe3] flex flex-col justify-center items-center relative !py-[100px] md:py-0 shrink-0
              ${isMenuOpen ? "panel-right-open" : "panel-right-close"}`}
          >
            <nav className="w-fit">
              <ul className="flex flex-col gap-5 md:gap-6 text-start">
                {navItems.map((item, index) => {
                  const parentMenuTransitionDuration = 600;
                  const staggerSpeed = 80;

                  const delay = isMenuOpen
                    ? parentMenuTransitionDuration + index * staggerSpeed
                    : (navItems.length - 1 - index) * 40;

                  return (
                    <li
                      key={index}
                      className={`fm-item ${isMenuOpen ? "menu-item-open" : "menu-item-close"}`}
                      style={{ animationDelay: `${delay}ms` }}
                    >
                      {item.children ? (
                        /* ---HA DROPDOWN MENÜ --- */
                        <div className="flex flex-col items-start">
                          <Link
                            href={item.path}
                            onClick={(e) => toggleDropdown(index, e)}
                            className="fm-link-wrap text-[20px] md:text-[30px] font-extrabold text-[#3f4603] flex items-center justify-center gap-2"
                            aria-label={item}
                          >
                            <span className="fm-link-flip">
                              <span className="fm-face">{item.name} ▾</span>
                              <span className="fm-face-back hover:text-[#3f4603]/60 transition-colors">
                                {item.name} ▾
                              </span>
                            </span>
                          </Link>

                          <div
                            className={`grid transition-all duration-300 ease-in-out ${
                              openDropdownIndex === index
                                ? "grid-rows-[1fr] opacity-100 mt-4 mb-2"
                                : "grid-rows-[0fr] opacity-0 mt-0 mb-0"
                            }`}
                          >
                            <ul className="flex flex-col gap-3 overflow-hidden">
                              {item.children.map((child, childIndex) => (
                                <li key={childIndex}>
                                  <Link
                                    href={child.path}
                                    onClick={toggleMenu}
                                    aria-label={child.name}
                                    className="text-[16px] md:text-[20px] font-bold text-[#3f4603]/80 hover:text-[#3f4603] transition-colors block py-1"
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        /* --- SIMA MENÜPONT  --- */
                        <Link
                          href={item.path}
                          onClick={toggleMenu}
                          aria-label={item.name}
                          className="fm-link-wrap text-[20px] md:text-[30px] font-extrabold text-[#3f4603]"
                        >
                          <span className="fm-link-flip">
                            {/* Előlap */}
                            <span className="fm-face">{item.name}</span>
                            {/* Hátlap */}
                            <span className="fm-face-back hover:text-[#3f4603]/60 transition-colors">
                              {item.name}
                            </span>
                          </span>
                        </Link>
                      )}
                    </li>
                  );
                })}

                {/* Kapcsi gomb*/}
                <li
                  className={`${isMenuOpen ? "menu-item-open" : "menu-item-close"} menu-delay-6 mt-2`}
                >
                  <Link
                    href="/kapcsolat"
                    onClick={toggleMenu}
                    aria-label="Lépjen kapcsolatba velünk, hogy felmérhessük pénzügyeit egy független elemzés alkalmával. Kapcsolat gomb"
                    className="w-fit mx-auto kapcsolat-btn flex flex-row items-center gap-3 p-[10px] px-8 rounded-full border-2 border-[#3f4603] text-[#3f4603] text-[20px] font-bold hover:bg-[#3f4603] hover:text-[#e7ebe3] transition-all hover:shadow-[0px_5px_10px_0px_rgba(0,0,0,0.4)]"
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
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
