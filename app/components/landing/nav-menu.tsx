"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn, smoothScroll } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const features = [
  {
    title: "AI Video Creation",
    href: "#features",
    description: "Generate professional videos with AI-powered tools and automation."
  },
  {
    title: "Voice Generation",
    href: "#features",
    description: "Create natural-sounding voiceovers in multiple languages and accents."
  },
  {
    title: "Content Analytics",
    href: "#features",
    description: "Track performance and optimize your content strategy with AI insights."
  },
  {
    title: "Automated Editing",
    href: "#features",
    description: "Let AI handle the editing process while you focus on creativity."
  },
]

const useCases = [
  {
    title: "YouTube Automation",
    href: "#use-cases",
    description: "Automate your YouTube content creation and boost productivity."
  },
  {
    title: "TikTok Growth",
    href: "#use-cases",
    description: "Create viral TikTok content with AI-powered tools."
  },
  {
    title: "Instagram Monetization",
    href: "#use-cases",
    description: "Boost your Instagram earnings with eye-catching Reels and Stories."
  },
  {
    title: "Educational Content",
    href: "#use-cases",
    description: "Create engaging educational content without showing your face."
  },
]

export function NavMenu({ layout = "desktop", closeSheet }: { layout?: "desktop" | "mobile", closeSheet?: () => void }) {
  if (layout === "desktop") {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {features.map((feature) => (
                  <ListItem
                    key={feature.title}
                    title={feature.title}
                    href={feature.href}
                    onClick={smoothScroll}
                  >
                    {feature.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground">Use Cases</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {useCases.map((useCase) => (
                  <ListItem
                    key={useCase.title}
                    title={useCase.title}
                    href={useCase.href}
                    onClick={smoothScroll}
                  >
                    {useCase.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#pricing" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-muted-foreground hover:text-foreground")} onClick={smoothScroll}>
              Pricing
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="#testimonials" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-muted-foreground hover:text-foreground")} onClick={smoothScroll}>
              Testimonials
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  } else {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="features">
          <AccordionTrigger>Features</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature.title}>
                  <Link
                    href={feature.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                      smoothScroll(e);
                      closeSheet && closeSheet();
                    }}
                  >
                    {feature.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="use-cases">
          <AccordionTrigger>Use Cases</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {useCases.map((useCase) => (
                <li key={useCase.title}>
                  <Link
                    href={useCase.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                    onClick={(e) => {
                      smoothScroll(e);
                      closeSheet && closeSheet();
                    }}
                  >
                    {useCase.title}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pricing">
          <Link
            href="#pricing"
            className="flex h-10 items-center justify-between py-2 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
            onClick={(e) => {
              smoothScroll(e);
              closeSheet && closeSheet();
            }}
          >
            Pricing
          </Link>
        </AccordionItem>
        <AccordionItem value="testimonials">
          <Link
            href="#testimonials"
            className="flex h-10 items-center justify-between py-2 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180"
            onClick={(e) => {
              smoothScroll(e);
              closeSheet && closeSheet();
            }}
          >
            Testimonials
          </Link>
        </AccordionItem>
      </Accordion>
    )
  }
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

