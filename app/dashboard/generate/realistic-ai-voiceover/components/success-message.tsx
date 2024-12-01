import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Play } from 'lucide-react'

interface SuccessMessageProps {
  audioUrl: string
}

export default function SuccessMessage({ audioUrl }: SuccessMessageProps) {
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
        <Button size="sm" onClick={() => window.open(audioUrl, "_blank")}>
          <Play className="w-4 h-4 mr-2" />
          Play
        </Button>
        <Button size="sm" variant="outline" onClick={() => window.open(audioUrl, "_blank")}>
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </motion.div>
  )
}

