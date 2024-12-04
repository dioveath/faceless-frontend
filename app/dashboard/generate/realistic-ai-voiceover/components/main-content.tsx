"use client"

import * as React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Wand2 } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import SettingsTab from "./settings-tab"
import HistoryTab from "./history-tab"
import LoadingScreen from "./loading-screen"
import SuccessMessage from "./success-message"
import { useGenerateAudio } from "@/hooks/audio/use-audio"
import { GenerateAudioRequest, GenerateAudioResponse } from "@/utils/api/types/audio-request.types"
import { useToast } from "@/hooks/use-toast"

export default function TextToSpeech() {
  const [text, setText] = React.useState("")
  const [generationId, setGenerationId] = React.useState("")
  const [isTaskComplete, setIsTaskComplete] = React.useState(false)
  const [generateError, setGenerateError] = React.useState("")
  const [showLoader, setShowLoader] = React.useState(false)
  const { toast } = useToast()

  const { mutateAsync: generateSpeech, isPending, error } = useGenerateAudio({
    onSuccess: (response: GenerateAudioResponse) => {
      setShowLoader(true)
      return setGenerationId(response.data.generation_id)
    },
    onError: (error) => {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to generate speech: " + error.message,
        variant: "destructive"
      })
    }
  })

  React.useEffect(() => {
    if (isTaskComplete) {
      setShowLoader(false)
    }
  }, [isTaskComplete])

  const handleGenerate = async () => {
    const request: GenerateAudioRequest = {
      audio_settings: {
        text: text,
        voice: "fathom",
        engine: "chatgptaudio",
        speed: 1,
        pitch: 1,
        volume: 1
      }
    }
    await generateSpeech(request)
  }

  return (
    <TooltipProvider>
      <AnimatePresence>
        {showLoader && <LoadingScreen isTaskComplete={isTaskComplete} setIsTaskComplete={setIsTaskComplete} generationId={generationId} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 max-w-[1200px]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold mb-1">Speech Synthesis</h1>
            <p className="text-sm text-muted-foreground">
              Unleash the power of our cutting-edge technology to generate realistic, captivating speech in a wide range of languages.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="p-4">
              <Textarea
                placeholder="Enter your text here..."
                className="min-h-[600px] resize-none border-0 focus-visible:ring-0"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-6"
          >
            <Tabs defaultValue="settings" className="h-[600px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <SettingsTab />
              <HistoryTab />
            </Tabs>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-between mt-6"
        >
          <div className="text-sm text-muted-foreground">
            {text.length} / 10,000
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Reset to defaults</Button>
            <Button onClick={handleGenerate} disabled={isPending || text.length === 0}>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate speech
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-4 p-4 bg-red-100 text-red-700 rounded-md"
            >
              {error.message}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {generationId && (
            <SuccessMessage generationId={generationId} />
          )}
        </AnimatePresence>
      </motion.div>
    </TooltipProvider>
  )
}