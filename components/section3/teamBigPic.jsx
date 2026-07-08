'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

export default function TeamBigPic({ title, name, desc, image }) {
  const [currentData, setCurrentData] = useState({ title, name, desc, image })
  const [phase, setPhase] = useState('in')

  const prevNameRef = useRef(name)

  useEffect(() => {
    if (prevNameRef.current === name) return

    setPhase('out')
    prevNameRef.current = name

    const timer = setTimeout(() => {
      setCurrentData({ title, name, desc, image })
      setPhase('in')
    }, 900)

    return () => clearTimeout(timer)
  }, [name, title, desc, image])

  return (
    <div className="w-full relative p-4 md:p-8 overflow-x-hidden">
      <div
        className={`group relative w-full h-full min-h-[400px] md:min-h-[600px] rounded-2xl overflow-hidden duration-700 shadow-md shadow-black/40 ring-1 ring-white/10 ${
          phase === 'out' ? 'out-img' : 'in-img'
        }`}
      >
        {/* HÁTTÉRKÉP ÉS GRADIENT OVERLAY */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={currentData.image}
            fill
            priority
            alt={`${currentData.name} - ${currentData.title}`}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1800px"

            className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />

          <div
            className={`absolute inset-0 bg-gradient-to-t from-zold to-black/15 opacity-100 ${
              phase === 'out' ? 'out-fader' : 'in-fader'
            }`}
          />
        </div>

        {/* TARTALOM (SZÖVEGEK) */}
        <div className="relative z-10 flex flex-col h-full justify-end p-6 md:p-10 pointer-events-none text-[#e7ebe3]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-6 mb-6">
            <div className="flex flex-col">
              <p
                className={`${
                  phase === 'out' ? 'out-name' : 'in-name'
                } text-3xl md:text-5xl font-extrabold tracking-tight leading-none mb-2 md:mb-3`}
              >
                {currentData.name}
              </p>

              <p
                className={`${
                  phase === 'out' ? 'out-title' : 'in-title'
                } text-xs md:text-sm uppercase tracking-[0.2em] text-vilagos font-semibold`}
              >
                {currentData.title}
              </p>
            </div>

            <div className="hidden md:block w-12 h-[2px] bg-[#e7ebe3]/50 rounded-full mb-2 shrink-0"></div>
          </div>

          <p
            className={`text-sm md:text-lg leading-relaxed text-[#e7ebe3]/90 max-w-3xl border-t border-[#e7ebe3]/20 pt-6 mt-auto ${
              phase === 'out' ? 'out-desc' : 'in-desc'
            }`}
          >
            {currentData.desc}
          </p>
        </div>
      </div>
    </div>
  )
}
