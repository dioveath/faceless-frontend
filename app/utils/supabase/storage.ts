import { createClient } from "./client";

const supabase = createClient();

const getSignedDownloadURL = async (bucket: string, path: string) => {
    const { data } = await supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}