"use client"

import { useTaskById } from "@/hooks/task/use-task"
import { useParams } from "next/navigation"
import { VideoTaskDetails } from "./component/video-task-details"


export default function Page() {
    const { id } = useParams()
    const { data, isLoading, error } = useTaskById(Array.isArray(id) ? id[0] : id || "", { enabled: !!id, refetchInterval: 1000 })
    
    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading && data && (
                <VideoTaskDetails task={data} />
            )}
        </div>
    )
}