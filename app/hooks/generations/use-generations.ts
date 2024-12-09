import { Tables } from "@/types/database.types";
import { deleteGenerationById, fetchAllAudioGenerationsByUserId, fetchAllVideoGenerationsByUserId, fetchAvailableGenerationsByUserId, fetchGenerationById } from "@/utils/api/generation";
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

export const useAllVideoGenerationsByUserId = (userId: string, page: number = 1, limit: number = 10, options?: Omit<UseInfiniteQueryOptions<PaginatedData<Generation>, Error, InfiniteData<PaginatedData<Generation>>, PaginatedData<Generation>, [string, string], number>, "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam">) => {
  return useInfiniteQuery<PaginatedData<Generation>, Error, InfiniteData<PaginatedData<Generation>>, [string, string], number>({
    queryKey: ["video-generations", userId],
    initialPageParam: page,
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }): Promise<PaginatedData<Generation>> => {
      const response = await fetchAllVideoGenerationsByUserId(userId, pageParam, limit);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length < limit ? undefined : allPages.length + 1;
    },
    getPreviousPageParam: (firstPage, _allPages) => {
      return firstPage.page > 1 ? firstPage.page - 1 : undefined;
    },
    ...options,
  });
};

export const useAllVideoGenerationsByCurrentUser = (page: number = 1, limit: number = 10, options?: Omit<UseInfiniteQueryOptions<PaginatedData<Generation>, Error, InfiniteData<PaginatedData<Generation>>, PaginatedData<Generation>, [string, string], number>, "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam">) => {
  const { user } = useUser();
  return useAllVideoGenerationsByUserId(user?.id || "", page, limit, {
    enabled: !!user,
    ...options,
  });
};

export const useAllAudioGenerationsByUserId = (userId: string, page: number = 1, limit: number = 10, options?: Omit<UseInfiniteQueryOptions<PaginatedData<Generation>, Error, InfiniteData<PaginatedData<Generation>>, PaginatedData<Generation>, [string, string], number>, "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam">) => {
  return useInfiniteQuery<PaginatedData<Generation>, Error, InfiniteData<PaginatedData<Generation>>, [string, string], number>({
    queryKey: ["audio-generations", userId],
    initialPageParam: page,
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }): Promise<PaginatedData<Generation>> => {
      const response = await fetchAllAudioGenerationsByUserId(userId, pageParam, limit);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length < limit ? undefined : allPages.length + 1;
    },
    getPreviousPageParam: (firstPage, _allPages) => {
      return firstPage.page > 1 ? firstPage.page - 1 : undefined;
    },
    ...options,
  });
};

export const useAllAudioGenerationsByCurrentUser = (page: number = 1, limit: number = 10, options?: Omit<UseInfiniteQueryOptions<PaginatedData<Generation>, Error, InfiniteData<PaginatedData<Generation>>, PaginatedData<Generation>, [string, string], number>, "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam">) => {
  const { user } = useUser();
  return useAllAudioGenerationsByUserId(user?.id || "", page, limit, {
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
