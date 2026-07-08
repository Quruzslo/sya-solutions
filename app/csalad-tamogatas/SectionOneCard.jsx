'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function SectionOneCard({ title, desc, icon, number }) {
  const cardRef = useRef(null)
  const [animationState, setAnimationState] = useState('hidden')
  const [isMd, setIsMd] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

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

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const cardDelay = isMd ? Number(number) * 0.15 : 0

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
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
      className="w-full h-full flex flex-col gap-4 relative rounded-sm p-6 p-[10px] !text-zold shadow-[0_15px_40px_rgba(0,0,0,0.25)] "
    >
      <div className="flex flex-col md:flex-row gap-3">
        <span className=" p-[10px] flex items-center justify-center text-feher font-extrabold text-sm bg-arany shadow-md rounded-full w-[40px] h-[40px]">
          {icon}
        </span>
        <h3 className="!text-[20px] !md:text-[25px] font-bold tracking-tight mt-2">{title}</h3>
      </div>

      <p className="text-sm md:text-base leading-relaxed  text-pretty border-t border-white/10 pt-4 mt-auto">
        {desc}
      </p>
    </motion.div>
  )
}
