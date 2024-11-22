"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { simulateApi } from "@/utils/api/simulate-api"

interface LibraryItem {
  id: number
  title: string
  description: string
}

export function LibraryContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState<LibraryItem[]>([])

  useEffect(() => {
    const fetchLibraryItems = async () => {
      const data = await simulateApi<LibraryItem[]>([
        { id: 1, title: "Document 1", description: "Description for Document 1" },
        { id: 2, title: "Document 2", description: "Description for Document 2" },
        { id: 3, title: "Document 3", description: "Description for Document 3" },
      ])
      setItems(data)
      setIsLoading(false)
    }

    fetchLibraryItems()
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Library</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

