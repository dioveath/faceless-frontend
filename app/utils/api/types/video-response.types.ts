import { CaptionSettings } from "./video-request.types";

export interface OptionDetails<T = string | number | boolean> {
    type: string;
    description: string;
    allowed_values?: T[]; // Optional, for lists of values
    range?: {
        min: number;
        max: number;
        step: number;
    }; // For numeric ranges
    example?: T[]; // Examples for illustrative purposes
}

export interface RedditSettings {
    subreddits: OptionDetails<string>;
    max_characters: OptionDetails<number>;
    min_characters: OptionDetails<number>;
}

export interface BackgroundSettings {
    layout_style: OptionDetails<string>;
    videos: OptionDetails<string>;
    audios: OptionDetails<string>;
    speed: OptionDetails<number>;
    volume: OptionDetails<number>;
}

export interface VoiceSettings {
    choice: OptionDetails<string>;
    name: OptionDetails<string>;
    random_voice: OptionDetails<boolean>;
}

export interface VideoSettings {
    video_format: OptionDetails<string>;
    content_type: OptionDetails<string>;
    background: BackgroundSettings;
    voice: VoiceSettings;
    caption_presets: OptionDetails<string>;
}

export interface AvailableOptionsResponse {
    message: string;
    data: {
        video_settings: VideoSettings;
        reddit_settings: RedditSettings;
        voice_engines: VoiceEngine[];
    };
    error: string | null;
    error_code: string | null;
}

export interface VoiceEngine {
    name: string
    description: string
    available_voices: string[]
}

export interface AvailableCaptionPresetsResponse {
    message: string;
    data: {
        presets: CaptionPreset[];
    };
    error: string | null;
    error_code: string | null;
}

export interface CaptionPreset {
    name: string;
    description: string;
    captions: CaptionSettings;
}

export interface GenerateVideoResponse {
    message: string;
    data: {
        task_id: string;
    };
    error: string | null;
    error_code: string | null;
}