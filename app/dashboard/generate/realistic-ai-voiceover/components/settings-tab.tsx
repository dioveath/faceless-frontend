"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Minus, Plus } from 'lucide-react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  engine: z.enum(["chatgptaudio", "elevenlabs"], {
    required_error: "Please select an engine.",
  }),
  voice: z.enum(["alex", "rachel", "dave"], {
    required_error: "Please select a voice.",
  }),
  speed: z.number().min(0.5).max(2).default(1),
  pitch: z.number().min(0).max(2).default(1),
  volume: z.number().min(0).max(2).default(1),
})

type FormValues = z.infer<typeof formSchema>
type SettingsTabProps = {
  onSettingsChange?: (settings: FormValues) => void
}

export default function SettingsTab({ onSettingsChange }: SettingsTabProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      engine: "chatgptaudio",
      voice: "alex",
      speed: 1,
      pitch: 1,
      volume: 1
    }
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      onSettingsChange?.(values as FormValues)
    })
    return () => subscription.unsubscribe()
  }, [onSettingsChange, form])

  return (
    <TabsContent value="settings" className="h-[calc(100%-40px)] overflow-auto">
      <Form {...form}>
        <form className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="engine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine</FormLabel>
                    <FormDescription>Select the engine to use for voiceover generation.</FormDescription>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue="chatgptaudio">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chatgptaudio">ChatGPT Audio</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice</FormLabel>
                    <FormDescription>Select the voice to use for voiceover generation.</FormDescription>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue="fathom">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ember">Ember - Professional</SelectItem>
                          <SelectItem value="cove">Cove - Casual</SelectItem>
                          <SelectItem value="breeze">Breeze - Professional</SelectItem>
                          <SelectItem value="juniper">Juniper - Casual</SelectItem>
                          <SelectItem value="vale">Vale - Professional</SelectItem>
                          <SelectItem value="maple">Maple - Casual</SelectItem>
                          <SelectItem value="fathom">Fathom - Professional</SelectItem>
                          <SelectItem value="orbit">Orbit - Casual</SelectItem>
                          <SelectItem value="glimmer">Glimmer - Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="speed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Speed</FormLabel>
                    <FormDescription>Adjust the speed of the voice.</FormDescription>
                    <FormControl>
                      <SliderControl
                        label="Speed"
                        value={[field.value]}
                        onChange={(value) => field.onChange(value[0])}
                        max={2}
                        step={0.1}
                        tooltipContent="Adjust the speed of the voice."
                        leftLabel="0.5x"
                        rightLabel="2x"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="pitch"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SliderControl
                        label="Pitch"
                        value={[field.value]}
                        onChange={(value) => field.onChange(value[0])}
                        max={2}
                        step={0.1}
                        tooltipContent="Adjust the pitch of the voice."
                        leftLabel="0x"
                        rightLabel="2x"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Volume</FormLabel>
                    <FormDescription>Adjust the volume of the voice.</FormDescription>
                    <FormControl>
                      <SliderControl
                        label="Volume"
                        value={[field.value]}
                        onChange={(value) => field.onChange(value[0])}
                        max={2}
                        step={0.1}
                        tooltipContent="Adjust the volume of the voice."
                        leftLabel="0x"
                        rightLabel="2x"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

          </motion.div>
        </form>
      </Form>
    </TabsContent>
  )
}

type SliderControlProps = {
  label: string
  value: [number]
  onChange: (value: [number]) => void
  max: number
  step: number
  tooltipContent: string
  leftLabel: string
  rightLabel: string
}

function SliderControl({ label, value, onChange, max, step, tooltipContent, leftLabel, rightLabel }: SliderControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-xs text-muted-foreground">{Math.round(value[0] * 100)}%</span>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Slider
            value={value}
            onValueChange={onChange}
            max={max}
            step={step}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}

