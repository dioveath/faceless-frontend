import { QueryClient } from "@tanstack/react-query";

const defaultQueryOptions = {
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
};

export { defaultQueryOptions };