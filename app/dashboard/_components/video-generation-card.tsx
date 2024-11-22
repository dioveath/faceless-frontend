'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface VideoGenerationCardProps {
  id: string
  title: string
  description: string
  imageUrl: string
  features: string[]
}

export function VideoGenerationCard({ id, title, description, imageUrl, features }: VideoGenerationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="relative overflow-hidden rounded-md mb-4">
            <Image
              src={imageUrl}
              alt={title}
              width={300}
              height={200}
              className="w-full h-48 object-cover transition-transform duration-300"
              style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
            />
          </div>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Learn More</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
          <Button asChild>
            <Link href={`/dashboard/generate/${id}`}>Generate</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}