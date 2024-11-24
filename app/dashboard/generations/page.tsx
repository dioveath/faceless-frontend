"use client"

import { useState, useEffect } from "react"
import { VideoTaskCard } from "./components/video-task-card"
import { useTaskForCurrentUser } from "@/hooks/task/use-task"


export default function Page() {
    const { data: tasks, isLoading, error } = useTaskForCurrentUser()

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading && <div>Loading...</div>}
            {!isLoading && tasks?.map((task) => (
                <VideoTaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}

