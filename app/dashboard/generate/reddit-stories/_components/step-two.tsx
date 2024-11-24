import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { VideoSettings } from "../_hooks/use-video-settings"
import { StepWrapper } from './step-wrapper'
import { VideoSettings as ResponseVideoSettings, RedditSettings } from "@/utils/api/types/video-response.types"

type StepTwoProps = {
  settings: VideoSettings
  updateBackgroundSettings: (key: keyof VideoSettings['background'], value: any) => void
  availableSettings: { video_settings: ResponseVideoSettings, reddit_settings: RedditSettings } | undefined
}

export function StepTwo({ settings, updateBackgroundSettings, availableSettings }: StepTwoProps) {
  if (!availableSettings) return null

  const layoutStyleAllowedValues = availableSettings.video_settings.background.layout_style.allowed_values;
  const backgroundVideosAllowedValues = availableSettings.video_settings.background.videos.allowed_values;
  const backgroundAudiosAllowedValues = availableSettings.video_settings.background.audios.allowed_values;
  const backgroundSpeedRange = availableSettings.video_settings.background.speed.range;
  const backgroundVolumeRange = availableSettings.video_settings.background.volume.range;

  return (
    <StepWrapper>
      <div className="space-y-4">
        {/* <div className="flex items-center space-x-2">
          <Switch
            id="random-background"
            checked={settings.background.random}
            onCheckedChange={(checked) => updateBackgroundSettings('random', checked)}
          />
          <Label htmlFor="random-background">Random Background</Label>
        </div> */}
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
              {layoutStyleAllowedValues?.map((value) => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Background Videos</Label>
          <div className="grid grid-cols-2 gap-2">
            {backgroundVideosAllowedValues?.map((video) => (
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
            {backgroundAudiosAllowedValues?.map((audio) => (
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
            min={backgroundSpeedRange?.min}
            max={backgroundSpeedRange?.max}
            step={backgroundSpeedRange?.step}
            value={[settings.background.speed]}
            onValueChange={([value]) => updateBackgroundSettings('speed', value)}
          />
        </div>
        <div>
          <Label htmlFor="volume">Background Volume: {Math.round(settings.background.volume * 100)}%</Label>
          <Slider
            id="volume"
            min={backgroundVolumeRange?.min}
            max={backgroundVolumeRange?.max}
            step={backgroundVolumeRange?.step}
            value={[settings.background.volume]}
            onValueChange={([value]) => updateBackgroundSettings('volume', value)}
          />
        </div>
      </div>
    </StepWrapper>
  )
}

