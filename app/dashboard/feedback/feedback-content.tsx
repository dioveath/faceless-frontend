"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { simulateApi } from "@/utils/api/simulate-api"

interface FeedbackItem {
  id: number
  user: string
  message: string
}

export function FeedbackContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState<FeedbackItem[]>([])

  useEffect(() => {
    const fetchFeedback = async () => {
      const data = await simulateApi<FeedbackItem[]>([
        { id: 1, user: "User A", message: "Great experience!" },
        { id: 2, user: "User B", message: "Could use some improvements." },
        { id: 3, user: "User C", message: "Love the new features!" },
      ])
      setFeedback(data)
      setIsLoading(false)
    }

    fetchFeedback()
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
      <h2 className="text-2xl font-bold mb-4">Feedback</h2>
      <div className="space-y-4">
        {feedback.map((item) => (
          <div key={item.id} className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold">{item.user}</h3>
            <p className="text-muted-foreground">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

