"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Mic } from 'lucide-react'

export function MainContent() {
  return (
    <main className="flex-1 p-4 bg-gray-100">
      <Card className="mb-4 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex justify-center items-center h-64 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold">
            Video
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mb-4">
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload a File
        </Button>
        <Button variant="outline" className="bg-white hover:bg-gray-100">
          <Mic className="w-4 h-4 mr-2" />
          Record
        </Button>
      </div>
      <Card>
        <CardContent className="p-2">
          <div className="bg-gray-200 h-16 flex items-center justify-center rounded">
            Timeline
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

