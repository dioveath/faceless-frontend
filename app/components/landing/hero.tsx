"use client"

import { Button } from "@/components/ui/button"
import { Tv } from 'lucide-react'
import { gradientAnimation } from '@/lib/utils'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const onMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector<HTMLDivElement>('div[class*="fixed w-8 h-8 rounded-full"]')
      if (!cursor) return

      const rect = hero.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const distanceX = (x - centerX) / centerX
      const distanceY = (y - centerY) / centerY

      cursor.style.transform = `translate(-50%, -50%) scale(${1 + Math.abs(distanceX) + Math.abs(distanceY)})`
    }

    hero.addEventListener('mousemove', onMouseMove)

    return () => {
      hero.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section ref={heroRef} className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
      <style dangerouslySetInnerHTML={{ __html: gradientAnimation }} />
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
          Generate Faceless Content
          <br className="hidden md:inline" />
          <span className="text-muted-foreground"> With AI Magic</span>
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg mb-6 md:mb-8">
          Transform your content creation journey with our AI-powered platform. Create unique, faceless videos and earn up to $10,000 monthly.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Button className="gradient-animation text-primary-foreground px-6 md:px-8 h-12 font-medium w-full md:w-auto">
            <Tv className="mr-2 h-5 w-5" />
            Start Creating Now
          </Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-6 md:px-8 h-12 transition-colors w-full md:w-auto">
            Try Demo
          </Button>
        </div>
      </div>
    </section>
  )
}

