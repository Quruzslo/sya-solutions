'use client'
import SyaLogo from './syaLogo'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [activeHeader, setActiveHeader] = useState(false)

  // Menü kezeléséhez szükséges állapotok
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hasRendered, setHasRendered] = useState(false) // Megakadályozza, hogy betöltéskor lefusson a kilépő animáció

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setActiveHeader(true)
      } else {
        setActiveHeader(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setHasRendered(true)
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // A menüpontokat egy tömbbe, késleltetést könnyebb rákötni
  const navItems = [
    { name: 'Csapatunk', path: '/csapat' },
    { name: 'Esettanulmányok', path: '/esettanulmanyok' },
    { name: 'Termékek', path: '/' },
    { name: 'Konzultáció', path: '/' },
    { name: 'GY.I.K', path: '/gyik' },
  ]

  return (
    <>
      <section className="w-full fixed top-0 left-0 flex flex-col justify-center items-center z-[999]">
        <header
          className={`flex flex-row max-w-[2560px] w-[90%] h-[75px] md:h-[100px] p-[10px] items-center
            transition-all duration-500 ease-in-out
            ${
              activeHeader && !isMenuOpen
                ? 'rounded-[50px] bg-black/50 backdrop-blur-md shadow-sm mt-2 md:mt-4'
                : 'rounded-none bg-transparent mt-0'
            }`}
        >
          {/* Logo Container */}
          <div className="w-fit h-fit min-w-[75px] max-h-[75px] xl:max-h-[100px] relative z-50">
            <SyaLogo activeHeader={activeHeader || isMenuOpen} />
          </div>

          {/* Menü Gomb  */}
          <button
            onClick={toggleMenu}
            className="ml-auto w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 relative group cursor-pointer overflow-hidden"
            aria-label="Menü megnyitása"
          >
            <span
              className={`block h-[4px] rounded-full w-8 bg-[#3f4603] transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'rotate-45 translate-y-2 bg-arany' : ''} 
                ${activeHeader && !isMenuOpen ? 'bg-white' : ''}`}
            />
            <span
              className={`block h-[4px] rounded-full w-8 bg-[#3f4603] transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-[50px]' : 'translate-x-[0px]'} 
                ${activeHeader && !isMenuOpen ? 'bg-white' : ''}`}
            />
            <span
              className={`block h-[4px] rounded-full w-8 bg-[#3f4603] transition-all duration-300 ease-in-out
                ${isMenuOpen ? '-rotate-45 -translate-y-2 bg-arany' : ''} 
                ${activeHeader && !isMenuOpen ? 'bg-white' : ''}`}
            />
          </button>
        </header>
      </section>

      {/* OVERLAY (A KÜLSŐ KONTÉNER) */}
      <div
        className={`fixed inset-0 w-full !h-[100vh] z-[998] flex flex-col md:flex-row 
          ${!hasRendered ? 'hidden' : ''} 
          /* Mobilon az EGÉSZ ablak görgethető, ha a tartalom magasabb mint a kijelző. Asztalin tiltjuk. */
          ${isMenuOpen ? 'pointer-events-auto overflow-y-auto md:overflow-hidden overflow-x-hidden' : 'pointer-events-none overflow-hidden'}`}
      >
        {/* BAL PANEL (VÁLTOZÁS: h-auto és fix min-h mobilon, nincs belső overflow!) */}
        <div
          className={`w-full md:w-1/2 h-[50%] md:h-full min-h-[280px]  bg-[#3f4603] flex flex-col justify-center items-center px-10 pt-[90px] pb-10 md:py-0 relative shrink-0
            ${isMenuOpen ? 'panel-left-open' : 'panel-left-close'}`}
        >
          <div
            className={`transition-opacity duration-700 delay-300 flex flex-col items-center ${
              isMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h2 className="!text-[25px] md:!text-3xl font-bold text-[#e7ebe3] mb-4 text-center leading-tight">
              S.Y.A.
              <br />
              Solutions
            </h2>
            <p className="text-[#e7ebe3]/70 text-base md:text-xl text-center max-w-sm">
              Prémium pénzügyi pajzs és stratégiai vagyonépítés. Biztosítsd be vállalkozásod és
              saját anyagi hátterét. Az öngondoskodás már nem luxus.
            </p>
          </div>
        </div>

        {/* JOBB PANEL (VÁLTOZÁS: h-auto és fix min-h a gomboknak mobilon, nincs belső overflow!) */}
        <div
          className={`w-full md:w-1/2 h-[50%] md:h-full min-h-[420px] bg-[#e7ebe3] flex flex-col justify-center items-center relative py-12 md:py-0 shrink-0
            ${isMenuOpen ? 'panel-right-open' : 'panel-right-close'}`}
        >
          <nav className="w-full">
            <ul className="flex flex-col gap-5 md:gap-6 text-center">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={`
                    ${isMenuOpen ? 'menu-item-open' : 'menu-item-close'} 
                    menu-delay-${index + 1}
                  `}
                >
                  <Link
                    href={item.path}
                    onClick={toggleMenu}
                    className="text-[20px] md:text-[30px] font-extrabold text-[#3f4603] hover:text-[#3f4603]/60 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              <li
                className={`${isMenuOpen ? 'menu-item-open' : 'menu-item-close'} menu-delay-6 mt-2`}
              >
                <Link
                  href="/kapcsolat"
                  onClick={toggleMenu}
                  className="inline-block p-[10px] px-8 rounded-full border-2 border-[#3f4603] text-[#3f4603] text-[20px] font-bold hover:bg-[#3f4603] hover:text-[#e7ebe3] transition-all"
                >
                  Kapcsolat
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
