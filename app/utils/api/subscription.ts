import { createClient } from "../supabase/client"
import type { Tables } from "@/types/database.types"

type Price = Tables<'prices'>;
type ProductWithPrices = Tables<'products'> & { prices: Price[] }

export const fetchSubscriptions = async (): Promise<ProductWithPrices[]> => {
    const supabase = createClient()
    const { data, error } = await supabase.from("products").select("*,prices:prices(*)").eq("active", true).filter("prices.active", "eq", true)
    if (error || !data) {
        throw new Error("Failed to fetch products")
    }
    return data
}