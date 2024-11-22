import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { VideoSettings } from "../_hooks/use-video-settings"
import { StepWrapper } from './step-wrapper'

type StepTwoProps = {
  settings: VideoSettings
  updateBackgroundSettings: (key: keyof VideoSettings['background'], value: any) => void
}

export function StepTwo({ settings, updateBackgroundSettings }: StepTwoProps) {
  return (
    <StepWrapper>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="random-background"
            checked={settings.background.random}
            onCheckedChange={(checked) => updateBackgroundSettings('random', checked)}
          />
          <Label htmlFor="random-background">Random Background</Label>
        </div>
        <div>
          <Label htmlFor="layout_style">Layout Style</Label>
          <Select
            value={settings.background.layout_style}
            onValueChange={(value) => updateBackgroundSettings('layout_style', value)}
          >
            <SelectTrigger id="layout_style">
              <SelectValue placeholder="Select layout style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="split_screen">Split Screen</SelectItem>
              <SelectItem value="full_screen">Full Screen</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Background Videos</Label>
          <div className="grid grid-cols-2 gap-2">
            {['minecraft', 'multiversus', 'fall-guys', 'subway-surfers', 'satisfying-cake'].map((video) => (
              <Button
                key={video}
                variant={settings.background.videos.includes(video) ? "default" : "outline"}
                onClick={() => {
                  const newVideos = settings.background.videos.includes(video)
                    ? settings.background.videos.filter(v => v !== video)
                    : [...settings.background.videos, video]
                  updateBackgroundSettings('videos', newVideos)
                }}
              >
                {video}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label>Background Audios</Label>
          <div className="grid grid-cols-3 gap-2">
            {['lofi', 'lofi-2', 'dragon-fly'].map((audio) => (
              <Button
                key={audio}
                variant={settings.background.audios.includes(audio) ? "default" : "outline"}
                onClick={() => {
                  const newAudios = settings.background.audios.includes(audio)
                    ? settings.background.audios.filter(a => a !== audio)
                    : [...settings.background.audios, audio]
                  updateBackgroundSettings('audios', newAudios)
                }}
              >
                {audio}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="speed">Background Speed: {settings.background.speed}x</Label>
          <Slider
            id="speed"
            min={0.5}
            max={2}
            step={0.1}
            value={[settings.background.speed]}
            onValueChange={([value]) => updateBackgroundSettings('speed', value)}
          />
        </div>
        <div>
          <Label htmlFor="volume">Background Volume: {Math.round(settings.background.volume * 100)}%</Label>
          <Slider
            id="volume"
            min={0}
            max={1}
            step={0.01}
            value={[settings.background.volume]}
            onValueChange={([value]) => updateBackgroundSettings('volume', value)}
          />
        </div>
      </div>
    </StepWrapper>
  )
}

