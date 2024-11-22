import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { VideoSettings } from "../_hooks/use-video-settings"
import { StepWrapper } from './step-wrapper'

type StepThreeProps = {
  settings: VideoSettings
  updateSettings: (key: keyof VideoSettings, value: any) => void
}

export function StepThree({ settings, updateSettings }: StepThreeProps) {
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
              <SelectItem value="chatgptaudio">ChatGPT Audio</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="random_voice"
            checked={settings.random_voice}
            onCheckedChange={(checked) => updateSettings('random_voice', checked)}
          />
          <Label htmlFor="random_voice">Random Voice</Label>
        </div>
        <div>
          <Label htmlFor="voice_name">Voice Name</Label>
          <Input
            id="voice_name"
            value={settings.voice_name}
            onChange={(e) => updateSettings('voice_name', e.target.value)}
            disabled={settings.random_voice}
          />
        </div>
      </div>
    </StepWrapper>
  )
}

