'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function TeamBigPic({ title, name, desc, image }) {
  const [data, setData] = useState({ title, name, desc, image })

  const [phase, setPhase] = useState('in')

  useEffect(() => {
    if (name === data.name) return

    setPhase('out')

    const timer = setTimeout(() => {
      setData({ title, name, desc, image })

      setPhase('in')
    }, 300)

    return () => clearTimeout(timer)
  }, [title, name, desc, image, data.name])

  return (
    <div className="flex flex-col gap-3 w-full relative h-full overflow-hidden cursor-pointer rounded-md shadow-[10px_10px_15px_rgba(0,0,0,0.6)] bg-black">
      <div className="w-full h-full absolute top-0 left-0 z-0 ">
        {/* <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" /> */}
        <Image
          src={data.image}
          fill
          priority
          alt="Pénzügyi tanácsok profiktól, tudatos pénzügyi döntések családosoknak, vállalkozóknak."
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1800px"

          className={`object-cover object-center z-0 ${phase === 'out' ? 'out-img' : 'in-img'}`}
        />
      </div>

      <div className=" relative flex flex-col z-10 p-[10px] w-full  mt-auto text-feher pointer-events-none">
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-zold to-zold/0" />

        <div className="flex flex-col md:flex-row z-10 justify-between mb-[50px]">
          <p className={phase === 'out' ? 'out-name' : 'in-name'}>{data.name}</p>

          <p className={phase === 'out' ? 'out-title' : 'in-title'}>{data.title}</p>
        </div>

        <p className={`flex flex-col z-10 mt-auto ${phase === 'out' ? 'out-desc' : 'in-desc'}`}>
          {data.desc}
        </p>
      </div>
    </div>
  )
}
