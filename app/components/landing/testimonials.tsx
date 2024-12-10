"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Content Creator",
    content: `"I was stuck, no good with camera, and had no clue how to go viral. Zeroface.ai’s AI video tools and niche targeting flipped my game. I hit my first $1k milestone in just a few weeks wihtout even showing my face."`,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Sarah Lee",
    role: "YouTuber",
    content: `"I dreamt of making real money from my channel, but editing sucked up all my time. Zeroface.ai’s automated shorts video generation and monetization tips changed everything. Within days, I was earning steady income—finally hitting my goals."`,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Mike Chen",
    role: "Digital Marketer",
    content: `"Guessing what my audience wanted felt hopeless. Zeroface.ai’s targeted niche analysis and AI-driven content put me on track fast. My videos went viral, and I saw real ROI within weeks."`,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
