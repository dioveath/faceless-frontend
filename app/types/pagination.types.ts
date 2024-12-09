export type PaginatedData<TData> = {
    data: TData[]
    totalCount: number
    page: number
}

// export type PageParam = number