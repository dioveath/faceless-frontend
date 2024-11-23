import apiClient from "./client";
import { AvailableOptionsResponse, GenerateVideoRequest } from "./types/video.types";

export const fetchAvailableGenerateOptions = async (): Promise<AvailableOptionsResponse> => {
    const response = await apiClient.get("/generate/available-options");
    return response.data;
}

export const generateVideo = async (requestData: GenerateVideoRequest) => {
    const response = await apiClient.post("/generate", requestData);
    return response.data;
}