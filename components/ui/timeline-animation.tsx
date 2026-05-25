'use client'

import React, { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

type ValidMotionTag =
  | 'div'
  | 'p'
  | 'span'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'nav'
  | 'ul'
  | 'li'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'

interface TimelineContentProps {
  children: React.ReactNode
  as?: ValidMotionTag
  animationNum?: number
  timelineRef?: React.RefObject<HTMLElement>
  customVariants?: Variants
  className?: string
  [key: string]: unknown
}

export function TimelineContent({
  children,
  as = 'div',
  animationNum = 0,
  customVariants,
  className,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  timelineRef: _timelineRef,
  ...rest
}: TimelineContentProps) {
  const localRef = useRef<HTMLElement>(null)
  const isInView = useInView(localRef, { once: true, margin: '0px 0px -40px 0px' })

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
  }

  const variants = customVariants || defaultVariants
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = (motion as any)[as]

  return (
    <MotionTag
      ref={localRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      custom={animationNum}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
