import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VideoSettings } from "../_hooks/use-video-settings"
import { StepWrapper } from './step-wrapper'

type StepOneProps = {
  settings: VideoSettings
  updateSettings: (key: keyof VideoSettings, value: any) => void
}

export function StepOne({ settings, updateSettings }: StepOneProps) {
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
              <SelectItem value="shorts">Shorts</SelectItem>
              <SelectItem value="long">Long Video</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="reddit_story">Reddit Story</SelectItem>
              <SelectItem value="fake_text">Fake Text</SelectItem>
              <SelectItem value="reddit_comment">Reddit Comment</SelectItem>
              <SelectItem value="generated_story">Generated Story</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </StepWrapper>
  )
}

