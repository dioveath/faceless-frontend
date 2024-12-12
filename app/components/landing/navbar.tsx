"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tv, Menu } from "lucide-react";
import { gradientAnimation } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import { NavMenu } from "./nav-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="auth/login?mode=login">
              <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </Button>
            </Link>
            <Link href="auth/login?mode=register">
              <Button className="gradient-animation text-primary-foreground font-medium">Get Started</Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <ThemeSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle>zeroface.ai</SheetTitle>
                <div className="mt-6 flex flex-col space-y-4">
                  <NavMenu layout="mobile" closeSheet={() => setIsOpen(false)} />
                  <div className="pt-4 flex flex-col space-y-2">
                    <Link href="auth/login?mode=login">
                      <Button variant="ghost" className="w-full justify-start text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="auth/login?mode=register">
                      <Button className="w-full gradient-animation text-primary-foreground font-medium">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
