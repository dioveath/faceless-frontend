import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { VideoSettings } from "../_hooks/use-video-settings"
import { StepWrapper } from './step-wrapper'

type StepFourProps = {
  settings: VideoSettings
  onGenerate: () => void
}

export function StepFour({ settings, onGenerate }: StepFourProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <StepWrapper>
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center">Video Settings Summary</h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="bg-primary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Video Format</h4>
            <p>{settings.video_format}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-primary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Content Type</h4>
            <p>{settings.content_type}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-primary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Background</h4>
            <ul className="list-disc list-inside">
              <li>Random: {settings.background.random ? 'Yes' : 'No'}</li>
              <li>Layout: {settings.background.layout_style}</li>
              <li>Speed: {settings.background.speed}x</li>
              <li>Volume: {Math.round(settings.background.volume * 100)}%</li>
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-primary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Voice Settings</h4>
            <ul className="list-disc list-inside">
              <li>Voice Choice: {settings.voice_choice}</li>
              <li>Random Voice: {settings.random_voice ? 'Yes' : 'No'}</li>
              <li>Voice Name: {settings.voice_name}</li>
            </ul>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button className="w-full" onClick={onGenerate}>Generate Video</Button>
        </motion.div>
      </div>
    </StepWrapper>
  )
}

