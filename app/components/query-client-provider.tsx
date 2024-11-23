'use client'

import { defaultQueryOptions } from '@/utils/api/queryConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: defaultQueryOptions
                },
            })
    )
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}