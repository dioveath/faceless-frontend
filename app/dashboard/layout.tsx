"use client"

import { ThemeProvider } from "@/dashboard/_components/theme-provider"
import { LayoutContent } from "@/dashboard/_components/layout-content"
import { useEffect, useState } from "react"
import React from "react"
import { AnimatePresence } from "framer-motion"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return (
    <React.Fragment>
      {isHydrated ? (
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatePresence mode="wait">
            <LayoutContent>{children}</LayoutContent>
          </AnimatePresence>
        </ThemeProvider>
      ) : (
        children
      )}
    </React.Fragment>

  )
}
