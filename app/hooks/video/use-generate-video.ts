import { useQuery, useMutation, UseMutationOptions } from "@tanstack/react-query"
import { fetchAvailableGenerateOptions, generateVideo } from "../../utils/api/video";
import { GenerateVideoRequest, AvailableOptionsResponse } from "../../utils/api/types/video.types";


export const useAvailableOptions = () => {
  return useQuery<AvailableOptionsResponse>({
    queryKey: ["available-options"],
    queryFn: fetchAvailableGenerateOptions,
  })
}

export const useGenerateVideo = (onSuccess: any, onError: any) => {
  return useMutation<void, Error, GenerateVideoRequest>({
    mutationFn: generateVideo,
    onSuccess: onSuccess,
    onError: onError,
  });
}