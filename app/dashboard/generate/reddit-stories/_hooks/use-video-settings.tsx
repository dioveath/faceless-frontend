import { useAvailableOptions } from '@/hooks/video/use-generate-video'
import { useEffect, useState } from 'react'

export type VideoSettings = {
  video_format: string
  content_type: string
  voice_choice: string
  random_voice: boolean
  voice_name: string
  caption_preset: string
  background: {
    random: boolean
    layout_style: string
    videos: string[]
    audios: string[]
    speed: number
    volume: number
  }
  reddit: {
    subreddits: string[]
    max_characters: number
    min_characters: number
  }
}

const initialSettings: VideoSettings = {
  video_format: "shorts",
  content_type: "reddit_story",
  caption_preset: "Bold and Simple",
  background: {
    random: true,
    layout_style: "split_screen",
    videos: [],
    audios: [],
    speed: 1.5,
    volume: 0.1
  },
  voice_choice: "chatgptaudio",
  random_voice: false,
  voice_name: "cove",
  reddit: {
    subreddits: ["AskReddit"],
    max_characters: 2500,
    min_characters: 1000
  }
}

export function useVideoSettings() {
  const [settings, setSettings] = useState<VideoSettings>(initialSettings)
  const { data, isLoading, error } = useAvailableOptions()

  useEffect(() => {
    if (!isLoading && data) {
      const { data: { video_settings, reddit_settings }} = data;

      setSettings(prev => ({
        ...prev,
        video_format: video_settings.video_format?.allowed_values?.[0] || prev.video_format,
        content_type: video_settings.content_type?.allowed_values?.[0] || prev.content_type,
        background: {
          ...prev.background,
          layout_style: video_settings.background.layout_style?.allowed_values?.[0] || prev.background.layout_style,
          speed: prev.background.speed,
          volume: prev.background.volume
        },
        voice_choice: video_settings.voice.choice?.allowed_values?.[0] || prev.voice_choice,
        voice_name: video_settings.voice.name?.allowed_values?.[0] || prev.voice_name,
        random_voice: prev.random_voice,
      }))


    }    

  }, [data, isLoading])

  const updateSettings = (key: keyof VideoSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const updateBackgroundSettings = (key: keyof VideoSettings['background'], value: any) => {
    setSettings(prev => ({
      ...prev,
      background: { ...prev.background, [key]: value }
    }))
  }

  const updateRedditSettings = (key: keyof VideoSettings['reddit'], value: any) => {
    setSettings(prev => ({
      ...prev,
      reddit: { ...prev.reddit, [key]: value }
    }))
  }

  return {
    isLoading,
    error,
    settings,
    updateSettings,
    updateBackgroundSettings,
    updateRedditSettings,
    availableSettings: data?.data
  }
}