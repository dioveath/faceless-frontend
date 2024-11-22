"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/dashboard/_components/sidebar"
import { MobileHeader } from "@/dashboard/_components/mobile-header"

export function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)


  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <MobileHeader onMenuClick={() => setIsMobileOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isMobileOpen={isMobileOpen}
          onMobileClose={() => setIsMobileOpen(false)}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

