"use client"

import { usePathname } from "next/navigation"
import { Menu, Share2, MoreVertical, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const pathname = usePathname()

  const getTitle = () => {
    switch (pathname) {
      case "/library":
        return "Library"
      case "/projects":
        return "Projects"
      case "/feedback":
        return "Feedback"
      default:
        return "Dashboard"
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-black text-white md:hidden">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>
      <span className="font-semibold">{getTitle()}</span>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="sm" className="ml-2">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
    </div>
  )
}

