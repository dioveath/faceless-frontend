"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useVideoSettings } from './_hooks/use-video-settings'
import { StepOne } from './_components/step-one'
import { StepTwo } from './_components/step-two'
import { StepThree } from './_components/step-three'
import { StepFour } from './_components/step-four'
import { LoadingScreen } from './_components/loading-screen'
import { useAvailableCaptionPresets, useGenerateVideo } from '@/hooks/video/use-generate-video'
import { GenerateVideoRequest } from '@/utils/api/types/video-request.types'
import { useRouter } from 'next/navigation'

export default function AIVideoGenerator() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const {isLoading, error, settings, availableSettings, updateSettings, updateBackgroundSettings, updateRedditSettings } = useVideoSettings()
  const router = useRouter()

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const { mutateAsync, isPending, } = useGenerateVideo({
    onSuccess: (data: any) => {
      setIsGenerating(false)
      return router.push(`/dashboard/generations/${data?.data?.generation_id}`)
    },
    onError: (error) => {
      setIsGenerating(false)
      console.error(error)
    }
  })

  const { data, isLoading: loadingCaptions, error: errorCaptions } = useAvailableCaptionPresets()

  const handleGenerate = async () => {

    if(loadingCaptions || error) return
    const captions = data?.data.presets.find(p => p.name === settings.caption_preset)?.captions
    if(!captions) return

    setIsGenerating(true)

    let videoGenerationRequest: GenerateVideoRequest = {
      video_settings: {
        video_format: settings.video_format,
        content_type: settings.content_type,
        background: settings.background,
        resolution_w: settings.video_format === 'shorts' ? 1080 : 1920,
        resolution_h: settings.video_format === 'shorts' ? 1920 : 1080,
        voice_choice: settings.voice_choice,
        random_voice: settings.random_voice,
        voice_name: settings.voice_name,
        captions: captions
      },
      reddit_settings: settings.reddit
    }

    await mutateAsync(videoGenerationRequest)
  }

  if(isLoading) return <LoadingScreen />  
  if(error) return <div>Error: {error.message}</div>
  
  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Reddit Video Generator - Step {step} of 4</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === 1 && <StepOne key="step1" settings={settings} updateSettings={updateSettings} updateRedditSettings={updateRedditSettings} availableSettings={availableSettings} />}
            {step === 2 && <StepTwo key="step2" settings={settings} updateBackgroundSettings={updateBackgroundSettings} availableSettings={availableSettings}/>}
            {step === 3 && <StepThree key="step3" settings={settings} updateSettings={updateSettings} availableSettings={availableSettings}/>}
            {step === 4 && <StepFour key="step4" settings={settings} onGenerate={handleGenerate} />}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={prevStep} disabled={step === 1}>Previous</Button>
          <Button onClick={nextStep} disabled={step === 4}>Next</Button>
        </CardFooter>
      </Card>
      {isGenerating && <LoadingScreen />}
    </>
  )
}


