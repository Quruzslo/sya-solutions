'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function SectionOneCard({ title, desc, number }) {
  const cardRef = useRef(null)
  const [animationState, setAnimationState] = useState('hidden')
  const cardDelay = Number(number) * 0.15 // Kicsit megnövelt késleltetés a prémium hatásért

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationState('visible')
        } else {
          if (entry.boundingClientRect.top > 0) {
            setAnimationState('hidden')
          }
        }
      },
      { rootMargin: '-50px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={animationState}
      variants={cardVariants}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: animationState === 'visible' ? cardDelay : 0,
      }}
      className="w-full h-full flex flex-col gap-4 relative rounded-xl p-6 md:p-8 bg-zold !text-vilagos shadow-[0_15px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10 min-h-[250px] md:min-h-[320px]"
    >
      <h3 className="text-xl md:text-2xl font-black tracking-tight mt-2">{title}</h3>
      <p className="text-sm md:text-base leading-relaxed text-vilagos/80 text-pretty border-t border-white/10 pt-4 mt-auto">
        {desc}
      </p>

      {/* Sorszám badge */}
      <span className="absolute flex items-center justify-center top-[-10px] right-[-10px] text-zold font-extrabold text-sm bg-feher shadow-md rounded-full w-[40px] h-[40px] border border-zold/10">
        #{number}
      </span>
    </motion.div>
  )
}
