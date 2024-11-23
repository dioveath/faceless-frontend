import { useAvailableOptions } from '@/hooks/video/use-generate-video'
import { useState } from 'react'

export type VideoSettings = {
  video_format: string
  content_type: string
  background: {
    random: boolean
    layout_style: string
    videos: string[]
    audios: string[]
    speed: number
    volume: number
  }
  voice_choice: string
  random_voice: boolean
  voice_name: string
}

const initialSettings: VideoSettings = {
  video_format: "shorts",
  content_type: "reddit_story",
  background: {
    random: true,
    layout_style: "split_screen",
    videos: ["minecraft"],
    audios: ["lofi"],
    speed: 1.5,
    volume: 0.1
  },
  voice_choice: "chatgptaudio",
  random_voice: false,
  voice_name: "cove"
}

export function useVideoSettings() {
  const [settings, setSettings] = useState<VideoSettings>(initialSettings)
  const { data, isLoading, error } = useAvailableOptions()

  console.log(data)

  const updateSettings = (key: keyof VideoSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateBackgroundSettings = (key: keyof VideoSettings['background'], value: any) => {
    setSettings(prev => ({
      ...prev,
      background: { ...prev.background, [key]: value }
    }))
  }

  return {
    settings,
    updateSettings,
    updateBackgroundSettings
  }
}

