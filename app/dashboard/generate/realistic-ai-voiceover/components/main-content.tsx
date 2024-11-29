"use client"

import * as React from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Wand2 } from 'lucide-react'
import SettingsTab from "./settings-tab"
import HistoryTab from "./history-tab"

export default function TextToSpeech() {
  const [text, setText] = React.useState("")

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 max-w-[1200px]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Speech Synthesis</h1>
            <p className="text-sm text-muted-foreground">
              Unleash the power of our cutting-edge technology to generate realistic, captivating speech in a wide range of languages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-6">
          <Card className="p-4">
            <Textarea
              placeholder="Enter your text here..."
              className="min-h-[600px] resize-none border-0 focus-visible:ring-0"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Card>

          <div className="space-y-6">
            <Tabs defaultValue="controls" className="h-[600px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <SettingsTab />
              <HistoryTab />
            </Tabs>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            {text.length} / 10,000
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Reset to defaults</Button>
            <Button>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate speech
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

