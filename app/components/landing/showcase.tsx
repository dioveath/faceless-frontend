"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import VideoItem from "./video-item";

const showcaseItems = [
  {
    title: "Fake text video",
    description: "Create text conversation shorts",
    image: "/placeholder.svg?height=480&width=360",
    video: "/videos/reddit-fake-text",
    href: "#",
  },
  {
    title: "Reddit convo video",
    description: "Create fictional Reddit-story shorts",
    image: "/placeholder.svg?height=480&width=360",
    video: "/videos/reddit-convo-video",
    href: "#",
  },
  {
    title: "Split-screen video",
    description: "Create split-screen shorts with gameplay",
    image: "/placeholder.svg?height=480&width=360",
    video: "/videos/split-screen-video",
    href: "#",
  },
];

export default function Showcase() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="container mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
          The software behind faceless virality
        </motion.h2>
        <div className="flex flex-wrap justify-center items-end gap-y-8">
          {showcaseItems.map((item, index) => {
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className={`px-8`}>
                <Link href={item.href} className="group block">
                  <div className="relative min-w-[240px] max-w-[300px] aspect-[9/16] overflow-hidden rounded-2xl mb-4">
                    <VideoItem src={item.video} title={item.title} description={item.description}/>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                    <ArrowRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
