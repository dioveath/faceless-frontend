export interface BackgroundSettings {
    random: boolean; // If True, select random backgrounds
    layout_style: string; // The layout style for the video (e.g., split_screen)
    videos: string[]; // List of video background options
    audios: string[]; // List of audio background options
    speed: number; // Playback speed for the background
    volume: number; // Volume level for the background audio
}

export interface CaptionSettings {
    max_line_count: number;
    max_line_length: number;
    font_name: string;
    font_size: number;
    primary_colour: string;
    secondary_colour: string;
    outline_colour: string;
    back_colour: string;
    bold: number;
    italic: number;
    underline: number;
    strikeout: number;
    outline: number;
    border_style: number;
    alignment: number;
    playres_x: number;
    playres_y: number;
    timer: number;
}

export interface VideoSettings {
    video_format: string; // Video format (e.g., shorts, long videos)
    content_type: string; // Specific video type (e.g., reddit_story, fake_text)
    background: BackgroundSettings; // Background settings
    resolution_w: number; // Video resolution width
    resolution_h: number; // Video resolution height
    voice_choice: string; // Voice option for narration
    random_voice: boolean; // Whether to select a random voice
    voice_name: string; // Specific voice name
    captions: CaptionSettings; // Captions settings
}

export interface RedditSettings {
    subreddits: string[]; // List of subreddits
    max_characters: number; // Maximum characters allowed
    min_characters: number; // Minimum characters required
}

export interface GenerateVideoRequest {
    video_settings: VideoSettings; // Video-specific settings
    reddit_settings: RedditSettings; // Reddit-specific settings
}
