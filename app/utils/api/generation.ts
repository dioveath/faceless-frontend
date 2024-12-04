import { Tables } from "@/types/database.types"
import { createClient } from "../supabase/client"

type Generation = Tables<"generations">

export const fetchAvailableGenerationsByUserId = async (userId: string): Promise<Generation[]> => {
    const supabase = createClient()
    const { data, error } = await supabase.from("generations").select("*").eq("user_id", userId)
    if (error || !data) {
        throw new Error("Failed to fetch generations")
    }
    return data
}


export const fetchGenerationById = async (generationId: string): Promise<Generation> => {
    const supabase = createClient()
    const { data, error } = await supabase.from("generations").select("*").eq("id", generationId).single()
    if (error || !data) {
        throw new Error("Failed to fetch generation")
    }
    return data
}


export const deleteGenerationById = async (generationId: string): Promise<void> => {
    const supabase = createClient()
    const { error } = await supabase.from("generations").delete().eq("id", generationId).single()
    if (error) {
        throw new Error("Failed to delete generation")
    }
}