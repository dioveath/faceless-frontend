import type { Tables } from "@/types/database.types";
import { fetchSubscriptions } from "@/utils/api/subscription";
import { useQuery } from "@tanstack/react-query";

type Price = Tables<'prices'>;
export type ProductWithPrices = Tables<'products'> & { prices: Price[] }

export const useSubscriptions = () => {
    return useQuery<ProductWithPrices[]>({
        queryKey: ["subscriptions"],
        queryFn: fetchSubscriptions
    })
}