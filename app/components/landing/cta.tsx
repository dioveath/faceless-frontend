"use client";

import { Button } from "@/components/ui/button";
import { gradientAnimation } from "@/lib/utils";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <style dangerouslySetInnerHTML={{ __html: gradientAnimation }} />
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Start Your Journey Today</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-sm md:text-base">Join thousands of faceless content creators who are already earning with our AI-powered platform. Start your faceless content journey now.</p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Link href="auth/login?mode=register" className="w-full">
            <Button className="gradient-animation text-primary-foreground px-6 md:px-8 py-3 rounded-lg flex items-center justify-center font-medium w-full md:w-auto">
              <span className="mr-2">✨</span>
              Get Started Now
            </Button>
          </Link>
          <Link href="#">
            <Button variant="link" className="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors w-full md:w-auto">
              Learn more
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
