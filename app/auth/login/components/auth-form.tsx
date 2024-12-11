"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import GoogleLoginButton from "./google-login";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface AuthFormProps {
  mode: "login" | "register";
  onToggleMode: () => void;
}

export function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
  };

  const formVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.1 },
    }),
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <motion.div initial="hidden" animate="visible" className="text-center">
        <motion.h2 variants={formVariants} custom={1} className="text-2xl font-bold text-foreground dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </motion.h2>
        <motion.p variants={formVariants} custom={2} className="mt-2 text-sm text-muted-foreground">
          {mode === "login" ? "Enter your credentials to access your account" : "Sign up to start creating faceless content"}
        </motion.p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div variants={formVariants} custom={3} className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
          </div>
        </motion.div>

        <motion.div variants={formVariants} custom={4} className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
          </div>
        </motion.div>

        <motion.div variants={formVariants} custom={5} className="space-y-2">
          <p className="text-xs text-muted-foreground mt-2">By continuing, you agree to our User Agreement and Privacy Policy.</p>
          <p className="text-xs text-destructive mt-2"> There is only Google authentication available for now.</p>
        </motion.div>

        <motion.div variants={formVariants} custom={5} className="space-y-4 pt-2">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
            disabled={true} // TODO: enable when we have email and password auth
          >
            {mode === "login" ? "Sign In" : "Sign Up"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {mode === "login" && (
            // <Button
            //   type="button"
            //   variant="outline"
            //   className="w-full"
            // >
            //   <Github className="mr-2 h-4 w-4" />
            //   Continue with GitHub
            // </Button>
            <Suspense fallback={<LoadingSpinner />}>
              <GoogleLoginButton />
            </Suspense>
          )}
        </motion.div>
      </form>

      <motion.div variants={formVariants} custom={6} className="text-center">
        <button onClick={onToggleMode} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </motion.div>
    </div>
  );
}
