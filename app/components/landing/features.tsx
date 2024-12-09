"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { Tv, DollarSign, Sparkles, Video, Target, Zap } from 'lucide-react'

const features = [
  {
    icon: Tv,
    title: "AI-Powered Creation",
    description: "Leverage cutting-edge AI to generate professional content without showing your face."
  },
  {
    icon: DollarSign,
    title: "Monetization Ready",
    description: "Built-in tools and strategies to help you monetize your content effectively."
  },
  {
    icon: Sparkles,
    title: "Unique Content",
    description: "Generate original, engaging content that stands out in the crowded digital space."
  },
  {
    icon: Video,
    title: "Video Generation",
    description: "Create professional videos with AI-generated voiceovers and animations."
  },
  {
    icon: Target,
    title: "Targeted Niches",
    description: "Identify and target profitable niches with our AI market analysis."
  },
  {
    icon: Zap,
    title: "Quick Results",
    description: "Start generating content and earning within days, not months."
  }
]

export default function Features() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

