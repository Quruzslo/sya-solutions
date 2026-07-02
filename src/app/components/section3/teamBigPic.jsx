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
    <div className="flex flex-col gap-3 w-full relative overflow-hidden p-[20px]">
      <div
        className={`flex flex-col gap-3 w-full relative h-full min-h-[350px] md:min-h-[550px] rounded-md overflow-hidden duration-600 shadow-[10px_10px_15px_rgba(0,0,0,0.6)] ${phase === 'out' ? 'out-img' : 'in-img'}`}
      >
        <div className="w-full h-full absolute top-0 left-0 z-0 ">
          <div
            className={`absolute bottom-0 left-0 z-2  w-full h-[50%] bg-gradient-to-t  from-zold to-zold/0  ${phase === 'out' ? 'out-fader' : 'in-fader'} `}
          />
          <Image
            src={currentData.image}
            fill
            priority
            alt={`${currentData.name} - ${currentData.title}`}
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1800px"
            className={`object-cover object-center z-0  `}
          />
        </div>

        <div className="relative flex flex-col z-10 p-[10px] w-full mt-auto text-feher pointer-events-none ">
          <div className="flex flex-col md:flex-row z-10 justify-between mb-[50px]">
            <p className={`${phase === 'out' ? 'out-name' : 'in-name'} text-[25px] font-bold`}>
              {currentData.name}
            </p>
            <p className={phase === 'out' ? 'out-title' : 'in-title'}>{currentData.title}</p>
          </div>

          <p className={`flex flex-col z-10 mt-auto ${phase === 'out' ? 'out-desc' : 'in-desc'}`}>
            {currentData.desc}
          </p>
        </div>
      </div>
    </div>
  )
}
