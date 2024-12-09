import { createClient } from "./server"




export const deleteGenerationById = async (generationId: string): Promise<void> => {    
    const supabase = await createClient()
    const { data: generation, error: generationError } = await supabase.from("generations").select("*").eq("id", generationId).single();
    if(generationError || !generation){
        throw new Error("Failed to fetch generation")
    }

    // const transaction = supabase.trans

}