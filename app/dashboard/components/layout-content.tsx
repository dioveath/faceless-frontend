"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar } from "@/dashboard/components/sidebar"
import { MobileHeader } from "@/dashboard/components/mobile-header"
import { BreadcrumbNav } from "@/dashboard/components/breadcrumb"

export function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const getTitle = () => {
    switch (pathname) {
      case "/dashboard/library":
        return "Library"
      case "/dashboard/projects":
        return "Projects"
      case "/dashboard/feedback":
        return "Feedback"
      default:
        return "Dashboard"
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <MobileHeader onMenuClick={() => setIsMobileOpen(true)} title={getTitle()} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isMobileOpen={isMobileOpen}
          onMobileClose={() => setIsMobileOpen(false)}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="p-4 border-b border-border">
            <BreadcrumbNav />
          </div>
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              className="flex-1 overflow-auto p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

