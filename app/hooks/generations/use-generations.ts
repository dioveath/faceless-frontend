import { Tables } from "@/types/database.types";
import { deleteGenerationById, fetchAllAudioGenerationsByUserId, fetchAvailableGenerationsByUserId, fetchGenerationById } from "@/utils/api/generation";
import { InfiniteData, UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions, useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "../user/use-user";
import { PaginatedData } from "@/types/pagination.types";

type Generation = Tables<"generations">;

export const useAvailableGenerationsByUserId = (userId: string, options?: UseQueryOptions<Generation[]>) => {
  return useQuery<Generation[]>({
    queryKey: ["generations", userId],
    queryFn: () => fetchAvailableGenerationsByUserId(userId),
    ...options,
  });
};

export const useAllAudioGenerationsByUserId = (userId: string, limit: number = 10, options?: Omit<UseInfiniteQueryOptions<PaginatedData<Generation>, Error, InfiniteData<PaginatedData<Generation>>, PaginatedData<Generation>, [string, string], number>, "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam">) => {
  return useInfiniteQuery<PaginatedData<Generation>, Error, InfiniteData<PaginatedData<Generation>>, [string, string], number>({
    queryKey: ["audio-generations", userId],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }): Promise<PaginatedData<Generation>> => {
      const response = await fetchAllAudioGenerationsByUserId(userId, pageParam, limit);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length < limit ? undefined : allPages.length + 1;
    },
    ...options,
  });
};

export const useAllAudioGenerationsByCurrentUser = (limit: number = 10, options?: Omit<UseInfiniteQueryOptions<PaginatedData<Generation>, Error, InfiniteData<PaginatedData<Generation>>, PaginatedData<Generation>, [string, string], number>, "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam">) => {
  const { user } = useUser();
  return useAllAudioGenerationsByUserId(user?.id || "", limit, {
    enabled: !!user,
    ...options,
  });
};

export const useGenerationById = (generationId: string, options?: Omit<UseQueryOptions<Generation>, "queryKey" | "queryFn">) => {
  return useQuery<Generation>({
    queryKey: ["generation", generationId],
    queryFn: () => fetchGenerationById(generationId),
    ...options,
  });
};

export const useDeleteGenerationById = (options?: UseMutationOptions<void, Error, string>) => {
  return useMutation({
    mutationFn: deleteGenerationById,
    ...options,
  });
};
