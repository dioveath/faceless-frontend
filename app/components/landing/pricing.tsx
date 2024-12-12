"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for beginners",
    features: ["5 AI-generated videos per month", "Basic editing tools", "720p video quality", "Email support"],
  },
  {
    name: "Pro",
    price: "$79",
    description: "For serious content creators",
    features: ["20 AI-generated videos per month", "Advanced editing tools", "1080p video quality", "Priority email support", "Custom branding"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: ["Unlimited AI-generated videos", "Full suite of editing tools", "4K video quality", "24/7 phone and email support", "Custom AI model training", "Dedicated account manager"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
          Choose Your Plan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex">
              <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 flex flex-col w-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-4xl font-bold text-foreground mb-4">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">{plan.price !== "Custom" ? "/month" : ""}</span>
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-muted-foreground">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Link href="auth/login?mode=register" className="w-full">
                    <Button className="w-full gradient-animation text-primary-foreground">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
