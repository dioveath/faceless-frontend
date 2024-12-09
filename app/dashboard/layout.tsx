import { ThemeProvider } from "@/dashboard/components/theme-provider";
import { LayoutContent } from "@/dashboard/components/layout-content";
import React from "react";
import { AnimatePresence } from "framer-motion";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AnimatePresence mode="wait">
          <LayoutContent>{children}</LayoutContent>
        </AnimatePresence>
      </ThemeProvider>
    </React.Fragment>
  );
}
