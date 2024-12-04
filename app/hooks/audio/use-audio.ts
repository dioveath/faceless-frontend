import { generateAudio } from "@/utils/api/audio";
import { GenerateAudioRequest, GenerateAudioResponse } from "@/utils/api/types/audio-request.types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";


export const useGenerateAudio = (options?: UseMutationOptions<GenerateAudioResponse, Error, GenerateAudioRequest>) => {
    return useMutation<GenerateAudioResponse, Error, GenerateAudioRequest>({
        mutationFn: generateAudio,
        ...options
    });
}

