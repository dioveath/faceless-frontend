import { useQuery, useMutation, UseMutationOptions } from "@tanstack/react-query"
import { fetchAvailableCaptionPresets, fetchAvailableGenerateOptions, generateVideo } from "../../utils/api/video";
import { GenerateVideoRequest, AvailableOptionsResponse } from "../../utils/api/types/video.types";
import { AvailableCaptionPresetsResponse } from "@/utils/api/types/video-response.types";

export const useAvailableOptions = () => {
  return useQuery<AvailableOptionsResponse>({
    queryKey: ["available-options"],
    queryFn: fetchAvailableGenerateOptions,
  })
}

export const useGenerateVideo = (options?: UseMutationOptions<void, Error, GenerateVideoRequest>) => {
  return useMutation<void, Error, GenerateVideoRequest>({
    mutationFn: generateVideo,
    ...options
  });
}

export const useAvailableCaptionPresets = () => {
  return useQuery<AvailableCaptionPresetsResponse>({
    queryKey: ["available-caption-presets"],
    queryFn: fetchAvailableCaptionPresets,
  })
}