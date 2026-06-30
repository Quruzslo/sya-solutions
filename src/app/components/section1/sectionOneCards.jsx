'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function SectionOneCard({ title, desc, number }) {
  const cardRef = useRef(null)
  const [animationState, setAnimationState] = useState('hidden')
  const cardDelay = Number(number) * 0.1

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
        stiffness: 300,
        damping: 15,
        delay: animationState === 'visible' ? cardDelay : 0,
      }}
      className="w-full h-full flex flex-col gap-3 relative rounded-sm p-[10px] bg-zold !text-vilagos shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
    >
      <h3 className="!text-[20px] font-black">{title}</h3>
      <p className="!text-[15px] text-pretty">{desc}</p>
      <span className="absolute flex items-center justify-center top-[-5px] right-[-5px] text-transparent font-bold text-[20px] [-webkit-text-stroke:1px_var(--color-zold)] bg-feher p-[10px] rounded-full w-[35px] h-[35px]">
        #{number}
      </span>
    </motion.div>
  )
}
