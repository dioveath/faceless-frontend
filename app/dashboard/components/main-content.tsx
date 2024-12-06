'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { VideoGenerationCard } from '@/dashboard/components/video-generation-card'
import { videoGenerationTypes } from '@/data/video-generation-types'
import { Input } from '@/components/ui/input'
import ShowToken from './show_token'

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTypes = videoGenerationTypes.filter((type) =>
    type.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">AI Video Generation Dashboard</h1>
      <ShowToken/>
      <Input
        type="search"
        placeholder="Search video generation types..."
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <VideoGenerationCard {...type} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

