import { Database } from "@/types/database.types"
import { deleteTaskById, fetchAvailableTasksByUserId, fetchTaskById } from "@/utils/api/task"
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useUser } from "../user/use-user"

type Task = Database["public"]["Tables"]["tasks"]["Row"]

export const useAvailableTasksByUserId = (userId: string, options: Omit<UseQueryOptions<Task[]>, "queryKey" | "queryFn">) => {
    return useQuery<Task[]>({
        queryKey: ["available-tasks", userId],
        queryFn: () => fetchAvailableTasksByUserId(userId),
        ...options
    })
}

export const useTaskForCurrentUser = () => {
    const { user } = useUser()
    return useAvailableTasksByUserId(user?.id || "", { enabled: !!user })
}

export const useTaskById = (taskId: string, options: Omit<UseQueryOptions<Task>, "queryKey" | "queryFn">) => {
    return useQuery<Task>({
        queryKey: ["task", taskId],
        queryFn: () => fetchTaskById(taskId),
        ...options
    })
}


export const useDeleteTaskById = (options?: UseMutationOptions<void, Error, string>) => {
    return useMutation({
        mutationFn: deleteTaskById,
        ...options
    })
}