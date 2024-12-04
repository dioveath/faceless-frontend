import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useGenerationById } from "@/hooks/generations/use-generations"

const loadingPhrases = [
  "Warming up the vocal cords...",
  "Clearing virtual throat...",
  "Practicing tongue twisters...",
  "Tuning the pitch perfect...",
  "Lubricating the speech synthesizer...",
  "Channeling inner Morgan Freeman...",
  "Adjusting virtual microphone...",
  "Preparing to drop the bass...",
  "Loading witty responses...",
  "Generating artificial charm..."
]

type LoadingScreenProps = {
  setIsTaskComplete: React.Dispatch<React.SetStateAction<boolean>>
  generationId: string
}

export default function LoadingScreen({ setIsTaskComplete, generationId }: LoadingScreenProps) {
  const [phrase, setPhrase] = useState(loadingPhrases[0])
  const { data, isPending, error } = useGenerationById(generationId, { enabled: !!generationId, refetchInterval: 1000 })

  useEffect(() => {
    const status = data?.status
    if (status === "Completed" || status === "Failed" || status === "Canceled") {
      setIsTaskComplete(true)
    }
  }, [data, setIsTaskComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)])
    }, 2000)
    return () => clearInterval(interval)
  }, [])


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {!error &&
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
            }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />}
        <motion.p
          key={phrase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold"
        >
          {error ? "Failed to generate speech: " + error.message : phrase}
        </motion.p>
      </div>
    </motion.div>
  )
}