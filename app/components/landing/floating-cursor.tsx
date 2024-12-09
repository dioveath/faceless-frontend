"use client"

import React, { useEffect, useRef } from 'react'

export default function FloatingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed w-8 h-8 rounded-full bg-[#8B5CF6] opacity-50 pointer-events-none z-50 transition-transform duration-100 ease-out"
      style={{ transform: 'translate(-50%, -50%) scale(1)' }}
    />
  )
}

