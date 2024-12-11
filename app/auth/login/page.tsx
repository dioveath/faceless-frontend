"use client";

import { useState } from "react";
import { Spotlight } from "@/components/ui/spot-light";
import { GraphBackground } from "@/components/ui/graph-background";
import { motion } from "framer-motion";
import { AuthContainer } from "./components/auth-container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const queryMode = searchParams.get("mode") as "login" | "register" || "login";
  const [mode, setMode] = useState<"login" | "register">(queryMode);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background">
      <GraphBackground/>
      <Spotlight className="hidden dark:block absolute inset-0" />
      
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="backdrop-blur-xl bg-background/50 dark:bg-neutral-900/50 p-8 rounded-2xl border border-border dark:border-neutral-800 shadow-2xl">
            <AuthContainer
              mode={mode}
              onToggleMode={() => setMode(mode === "login" ? "register" : "login")}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}