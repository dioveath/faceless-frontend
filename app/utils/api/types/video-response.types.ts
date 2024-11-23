export interface VideoSettings {
    video_format: string;
    content_type: string;
    background: BackgroundSettings;
    resolution_w: number;
    resolution_h: number;
    voice_choice: string;
    random_voice: boolean;
    voice_name: string;
}

export interface BackgroundSettings {
    random: boolean;
    layout_style: string;
    videos: string[];
    audios: string[];
    speed: number;
    volume: number;
}


export interface RedditSettings {
    subreddits: string[];
    max_characters: number;
    min_characters: number;
}

export interface AvailableOptionsResponse {
    message: string;
    data: {
        video_settings: VideoSettings;
        reddit_settings: RedditSettings;
    }
}

export interface GenerateVideoResponse {
    message: string;
    data: {
        task_id: string;
    }
}
