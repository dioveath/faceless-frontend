"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { Tv, DollarSign, Sparkles, Video, Target, Zap } from 'lucide-react'
import { motion } from "framer-motion"

const features = [
  {
    icon: Tv,
    title: "AI Video Creation",
    description: "Generate professional videos with AI-powered tools and automation."
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
    <section id="features" className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center"
        >
          Our Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

