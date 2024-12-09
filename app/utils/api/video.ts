import apiClient from "./client";
import { AvailableCaptionPresetsResponse } from "./types/video-response.types";
import { AvailableOptionsResponse, GenerateVideoRequest } from "./types/video.types";

export const fetchAvailableGenerateOptions = async (): Promise<AvailableOptionsResponse> => {
    const response = await apiClient.get("/generate/available-options");
    return response.data;
}

export const generateVideo = async (requestData: GenerateVideoRequest) => {
    const response = await apiClient.post("/video/generate", requestData);
    return response.data;
}

export const fetchAvailableCaptionPresets = async (): Promise<AvailableCaptionPresetsResponse> => {
    const response = await apiClient.get("/generate/available-caption-presets");
    return response.data;
}