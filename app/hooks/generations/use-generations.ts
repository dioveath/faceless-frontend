import { Tables } from "@/types/database.types"
import { deleteGenerationById, fetchAvailableGenerationsByUserId, fetchGenerationById } from "@/utils/api/generation"
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query"


type Generation = Tables<'generations'>

export const useAvailableGenerationsByUserId = (userId: string, options?: UseQueryOptions<Generation[]>) => {
    return useQuery<Generation[]>({
        queryKey: ["generations", userId],
        queryFn: () => fetchAvailableGenerationsByUserId(userId),
        ...options
    })
}


export const useGenerationById = (generationId: string, options?: Omit<UseQueryOptions<Generation>, "queryKey" | "queryFn">) => {
    return useQuery<Generation>({
        queryKey: ["generation", generationId],
        queryFn: () => fetchGenerationById(generationId),
        ...options
    })
}


export const useDeleteGenerationById = (options?: UseMutationOptions<void, Error, string>) => {
    return useMutation({
        mutationFn: deleteGenerationById,
        ...options
    })
}