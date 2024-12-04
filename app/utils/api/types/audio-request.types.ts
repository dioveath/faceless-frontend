import { CaptionSettings } from "./video-request.types";

export interface GenerateAudioRequest {
    audio_settings: AudioSettings;
    caption_settings?: CaptionSettings;
}

export interface AudioSettings {
    text: string,
    voice: string,
    engine: string,
    speed: number,
    pitch: number,
    volume: number    
}

export interface GenerateAudioResponse {
    message: string;
    data: {
        task_id: string;
        generation_id: string;
    };
}