"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Tv, Menu, X } from 'lucide-react'
import { gradientAnimation, smoothScroll } from '@/lib/utils'
import { ThemeSwitcher } from './theme-switcher'
import { NavMenu } from './nav-menu'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-sm border-b border-border">
      <style dangerouslySetInnerHTML={{ __html: gradientAnimation }} />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-foreground">
            <Tv className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">zeroface.ai</span>
          </Link>
          
          <div className="hidden md:flex items-center">
            <NavMenu />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitcher />
            <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Button>
            <Button className="gradient-animation text-primary-foreground font-medium">
              Get Started
            </Button>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <ThemeSwitcher />
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <NavMenu />
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="ghost" className="w-full justify-start text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </Button>
              <Button className="w-full gradient-animation text-primary-foreground font-medium">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

