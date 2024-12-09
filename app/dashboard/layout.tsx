import { LayoutContent } from "@/dashboard/components/layout-content";
import React from "react";
import { AnimatePresence } from "framer-motion";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
        <LayoutContent>{children}</LayoutContent>
      </AnimatePresence>
    </React.Fragment>
  );
}
