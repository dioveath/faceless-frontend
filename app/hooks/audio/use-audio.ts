import { generateAudio } from "@/utils/api/audio";
import { GenerateAudioRequest, GenerateAudioResponse } from "@/utils/api/types/audio-request.types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGenerateAudio = (options?: UseMutationOptions<GenerateAudioResponse, AxiosError<APIError>, GenerateAudioRequest>) => {
    return useMutation<GenerateAudioResponse, AxiosError<APIError>, GenerateAudioRequest>({
        mutationFn: generateAudio,
        ...options
    });
}

