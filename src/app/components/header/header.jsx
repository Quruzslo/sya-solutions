'use client'
import SyaLogo from './syaLogo'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [activeHeader, setActiveHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 15px-nél már azonnal reagál, tökéletes dinamika
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

  return (
    <section className="w-full fixed top-0 left-0 flex flex-col justify-center items-center z-[999]">
      <header
        className={`flex flex-row w-full max-w-[2560px] md:w-[90%] h-[75px] md:h-[100px] p-[10px] items-center
          transition-all duration-500 ease-in-out
          ${
            activeHeader
              ? 'rounded-[50px] bg-black/50 backdrop-blur-md shadow-sm mt-2 md:mt-4'
              : 'rounded-none bg-transparent mt-0'
          }`}
      >
        {/* Logo Container */}
        <div className="w-fit h-fit min-w-[75px] max-h-[75px] xl:max-h-[100px]">
          <SyaLogo activeHeader={activeHeader} />
        </div>

        {/* Navigáció */}
        <nav className="flex flex-row items-center ml-auto">
          <ul
            className={`hidden md:flex flex-row gap-[15px] text-[#3f4603] font-bold ${activeHeader ? 'text-feher' : 'text-[#3f4603]'}`}
          >
            <li className="hover:opacity-80 transition-opacity">
              <Link href="/csapat">Csapatunk</Link>
            </li>
            <li className="hover:opacity-80 transition-opacity">
              <Link href="/esettanulmanyok">Esettanulmányok</Link>
            </li>
            <li className="hover:opacity-80 transition-opacity">
              <Link href="/">Termékek</Link>
            </li>
            <li className="hover:opacity-80 transition-opacity">
              <Link href="/">Konzultáció</Link>
            </li>
            <li className="hover:opacity-80 transition-opacity">
              <Link href="/gyik">GY.I.K</Link>
            </li>
          </ul>

          <Link
            href="/kapcsolat"
            className="py-[8px] px-[20px] rounded-[5px] bg-[#3f4603] text-[#e7ebe3] ml-[20px] font-semibold hover:bg-[#3f4603]/90 transition-colors"
          >
            Kapcsolat
          </Link>
        </nav>
      </header>
    </section>
  )
}
