import { Database, Tables } from "@/types/database.types"
import { createClient } from "../supabase/client"
import apiClient from "./client"

type Task = Tables<"background_tasks">

export const fetchAvailableTasksByUserId = async (userId: string): Promise<Task[]> => {
    const supabase = createClient()
    const { data, error } = await supabase.from("background_tasks").select("*").eq("user_id", userId)
    if (error || !data) {
        throw new Error("Failed to fetch background tasks")
    }
    return data
}

export const fetchTaskById = async (taskId: string): Promise<Task> => {
    const supabase = createClient()
    const { data, error } = await supabase.from("background_tasks").select("*").eq("id", taskId).single()
    if (error || !data) {
        throw new Error("Failed to fetch background task")
    }
    return data
}

export const deleteTaskById = async (taskId: string): Promise<void> => {
    const supabase = createClient()
    const { error } = await supabase.from("background_tasks").delete().eq("id", taskId).single()
    if (error) {
        throw new Error("Failed to delete background task")
    }
}

export const downloadLinkForTask = (task: Task): string => {
    return apiClient.getUri({ url: `/download/${task.id}` })
}