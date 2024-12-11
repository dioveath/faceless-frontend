"use client";

import { LoadingFullScreen } from "@/components/loading-full-screen";
import { Suspense } from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingFullScreen />}>{children}</Suspense>;
}
