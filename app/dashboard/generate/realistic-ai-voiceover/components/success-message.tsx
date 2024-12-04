import React, { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Pause, Play } from 'lucide-react'
import { useGenerationById } from "@/hooks/generations/use-generations"

interface SuccessMessageProps {
  generationId: string
}

export default function SuccessMessage({ generationId }: SuccessMessageProps) {
  const { data, isPending, error } = useGenerationById(generationId, { enabled: !!generationId })
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mt-4 p-4 bg-red-100 text-red-700 rounded-md"
      >
        <p className="font-semibold mb-2">Failed to generate speech: {error.message}</p>
      </motion.div>
    )
  }
  

  if (isPending || data?.output_url == null) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mt-4 p-4 bg-green-100 text-green-700 rounded-md"
      >
        <p className="font-semibold mb-2">Generating speech...</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-4 p-4 bg-green-100 text-green-700 rounded-md"
    >
      <p className="font-semibold mb-2">Speech generated successfully!</p>
      <div className="flex gap-2">
        <audio ref={audioRef} src={data?.output_url} onEnded={() => setIsPlaying(false)} />
        <Button size="sm" onClick={handlePlayPause}>
          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => window.open(data?.output_url || undefined, "_blank")}>
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </motion.div>
  )
}

