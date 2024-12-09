import { Tables } from "@/types/database.types";
import { createClient } from "../supabase/client";
import { PaginatedData } from "@/types/pagination.types";

type Generation = Tables<"generations">;

export const fetchAvailableGenerationsByUserId = async (userId: string): Promise<Generation[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("generations").select("*").eq("user_id", userId);
  if (error || !data) {
    throw new Error("Failed to fetch generations");
  }
  return data;
};

export const fetchAllVideoGenerationsByUserId = async (userId: string, page: number = 1, limit: number = 10): Promise<PaginatedData<Generation>> => {
  const supabase = createClient();
  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: false })
    .eq("user_id", userId)
    .eq("type", "Video")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error || !data) {
    throw new Error("Failed to fetch generations");
  }

  return { data: data, totalCount: count || 0, page: page };
};

export const fetchAllAudioGenerationsByUserId = async (userId: string, page: number = 1, limit: number = 10): Promise<PaginatedData<Generation>> => {
  const supabase = createClient();
  const offset = (page - 1) * limit;

  const { data, count, error } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: false })
    .eq("user_id", userId)
    .eq("type", "Audio")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error || !data) {
    throw new Error("Failed to fetch generations");
  }

  return { data: data, totalCount: count || 0, page: page };
};

export const fetchGenerationById = async (generationId: string): Promise<Generation> => {
  const supabase = createClient();
  const { data, error } = await supabase.from("generations").select("*").eq("id", generationId).single();
  if (error || !data) {
    throw new Error("Failed to fetch generation");
  }
  return data;
};

export const deleteGenerationById = async (generationId: string): Promise<void> => {
  const supabase = createClient();

  const { data: generation, error: generationError } = await supabase.from("generations").select("*").eq("id", generationId).single();
  if (generationError || !generation) {
    throw new Error("Failed to fetch generation");
  }

  const { error: tasksError } = await supabase.from("background_tasks").delete().eq("generation_id", generationId);
  if (tasksError) {
    throw new Error("Failed to delete background tasks");
  }

  const { error: storageError } = await supabase.storage.from("generated_videos").remove([`${generation.user_id}/${generation.id}.mp4`]);
  if (storageError) {
    throw new Error("Failed to delete generation from storage");
  }

  const { error } = await supabase.from("generations").delete().eq("id", generationId).single();
  if (error) {
    throw new Error("Failed to delete generation");
  }
};
