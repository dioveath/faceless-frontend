import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VideoSettings } from "../_hooks/use-video-settings"
import { StepWrapper } from './step-wrapper'
import { VideoSettings as ResponseVideoSettings, RedditSettings } from "@/utils/api/types/video-response.types"
import { MultiInput } from "@/components/ui/multi-input"
import { Input } from "@/components/ui/input"

type StepOneProps = {
  settings: VideoSettings
  updateSettings: (key: keyof VideoSettings, value: any) => void
  updateRedditSettings: (key: keyof VideoSettings['reddit'], value: any) => void
  availableSettings: { video_settings: ResponseVideoSettings, reddit_settings: RedditSettings } | undefined
}

export function StepOne({ settings, updateSettings, availableSettings, updateRedditSettings }: StepOneProps) {
  if (!availableSettings) return null
  const formatAllowedValues = availableSettings.video_settings.video_format.allowed_values;
  const contentTypeAllowedValues = availableSettings.video_settings.content_type.allowed_values;

  return (
    <StepWrapper>
      <div className="space-y-4">
        <div>
          <Label htmlFor="video_format">Video Format</Label>
          <Select
            value={settings.video_format}
            onValueChange={(value) => updateSettings('video_format', value)}
          >
            <SelectTrigger id="video_format">
              <SelectValue placeholder="Select video format" />
            </SelectTrigger>
            <SelectContent>
              {formatAllowedValues?.map((value) => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="subreddits">Subreddits</Label>
          <MultiInput placeholder="Enter subreddits..." value={settings.reddit.subreddits} onChange={(value) => updateRedditSettings('subreddits', value)} />
        </div>
        <div>
          <Label htmlFor="content_type">Content Type</Label>
          <Select
            value={settings.content_type}
            onValueChange={(value) => updateSettings('content_type', value)}
          >        
            <SelectTrigger id="content_type">
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              {contentTypeAllowedValues?.map((value) => (
                <SelectItem key={value} value={value}>{value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="min_characters">Minimum Characters</Label>
          <Input
            id="min_characters"
            type="number"
            value={settings.reddit.min_characters}
            onChange={(e) => updateRedditSettings('min_characters', e.target.value)}
            className="input"
          />
        </div>
        <div>
          <Label htmlFor="max_characters">Maximum Characters</Label>
          <Input
            id="max_characters"
            type="number"
            value={settings.reddit.max_characters}
            onChange={(e) => updateRedditSettings('max_characters', e.target.value)}
            className="input"
          />
        </div>
      </div>
    </StepWrapper>
  )
}

