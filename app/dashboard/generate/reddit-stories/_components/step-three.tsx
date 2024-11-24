import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { VideoSettings } from "../_hooks/use-video-settings"
import { StepWrapper } from './step-wrapper'
import { VideoSettings as ResponseVideoSettings, RedditSettings, VoiceEngine } from "@/utils/api/types/video-response.types"

type StepThreeProps = {
  settings: VideoSettings
  updateSettings: (key: keyof VideoSettings, value: any) => void
  availableSettings: { video_settings: ResponseVideoSettings, reddit_settings: RedditSettings, voice_engines: VoiceEngine[] } | undefined
}

export function StepThree({ settings, updateSettings, availableSettings }: StepThreeProps) {
  if (!availableSettings) return null
  const { video_settings, voice_engines } = availableSettings
  
  const availableVoiceEngines = video_settings.voice.choice.allowed_values
  const availableVoiceNames = voice_engines.find(engine => engine.name === settings.voice_choice)?.available_voices
  const availableCaptionPresets = video_settings.caption_presets.allowed_values
  
  return (
    <StepWrapper>
      <div className="space-y-4">
        <div>
          <Label htmlFor="voice_choice">Voice Choice</Label>
          <Select
            value={settings.voice_choice}
            onValueChange={(value) => updateSettings('voice_choice', value)}
          >
            <SelectTrigger id="voice_choice">
              <SelectValue placeholder="Select voice choice" />
            </SelectTrigger>
            <SelectContent>
              {availableVoiceEngines?.map((engine) => (
                <SelectItem key={engine} value={engine}>{engine}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="random_voice"
            checked={settings.random_voice}
            onCheckedChange={(checked) => updateSettings('random_voice', checked)}
            disabled={true}
          />
          <Label htmlFor="random_voice">Random Voice</Label>
        </div>
        <div>
          <Label htmlFor="voice_name">Voice Name</Label>
          <Select
            value={settings.voice_name}
            onValueChange={(value) => updateSettings('voice_name', value)}
            disabled={settings.random_voice}
          >
            <SelectTrigger id="voice_name">
              <SelectValue placeholder="Select voice name" />
            </SelectTrigger>
            <SelectContent>
              {availableVoiceNames?.map((name) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>          
        </div>
        <div>
          <Label htmlFor="caption_preset">Caption Preset</Label>
          <Select
            value={settings.caption_preset}
            onValueChange={(value) => updateSettings('caption_preset', value)}
          >
            <SelectTrigger id="caption_preset">
              <SelectValue placeholder="Select caption preset" />
            </SelectTrigger>
            <SelectContent>
              {availableCaptionPresets?.map((preset) => (
                <SelectItem key={preset} value={preset}>{preset}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </StepWrapper>
  )
}

