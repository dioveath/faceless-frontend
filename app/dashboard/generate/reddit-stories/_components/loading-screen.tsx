import { motion } from 'framer-motion'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <h2 className="text-2xl font-semibold mb-2">Generating Your Video</h2>
        <p className="text-muted-foreground">Please wait while we create your masterpiece...</p>
      </motion.div>
    </div>
  )
}

