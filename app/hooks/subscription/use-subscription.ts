import type { Tables } from "@/types/database.types";
import { fetchSubscriptions, fetchUserSubscriptions } from "@/utils/api/subscription";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useUser } from "../user/use-user";

export type Price = Tables<'prices'>;
export type ProductWithPrices = Tables<'products'> & { prices: Price[] }
export type Subscription = Tables<'subscriptions'>;

export const useSubscriptions = () => {
    return useQuery<ProductWithPrices[]>({
        queryKey: ["subscriptions"],
        queryFn: fetchSubscriptions
    })
}

export const useUserSubscriptions = () => {
    const { user } = useUser()
    return useQuery<Subscription[]>({
        queryKey: ["user-subscriptions", user?.id],
        queryFn: () => fetchUserSubscriptions(user?.id || ""),
        enabled: !!user
    })
}