import apiClient from "./client";
import { GenerateAudioRequest } from "./types/audio-request.types";

export const generateAudio = async (requestData: GenerateAudioRequest) => {
    const response = await apiClient.post("/audio/generate", requestData);
    return response.data;
}