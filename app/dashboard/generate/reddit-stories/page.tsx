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

export default function AIVideoGenerator() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const { settings, updateSettings, updateBackgroundSettings } = useVideoSettings()

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate video generation process
    setTimeout(() => {
      setIsGenerating(false)
      // Here you would typically handle the generated video
    }, 5000)
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Reddit Video Generator - Step {step} of 4</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {step === 1 && <StepOne key="step1" settings={settings} updateSettings={updateSettings} />}
            {step === 2 && <StepTwo key="step2" settings={settings} updateBackgroundSettings={updateBackgroundSettings} />}
            {step === 3 && <StepThree key="step3" settings={settings} updateSettings={updateSettings} />}
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


