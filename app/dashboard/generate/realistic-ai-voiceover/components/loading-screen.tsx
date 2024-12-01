import React from "react"
import { motion } from "framer-motion"

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

export default function LoadingScreen() {
  const [phrase, setPhrase] = React.useState(loadingPhrases[0])

  React.useEffect(() => {
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
        />
        <motion.p
          key={phrase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold"
        >
          {phrase}
        </motion.p>
      </div>
    </motion.div>
  )
}

