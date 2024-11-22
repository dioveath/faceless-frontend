"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { simulateApi } from "@/utils/api/simulate-api"

interface Project {
  id: number
  name: string
  status: string
}

export function ProjectsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await simulateApi<Project[]>([
        { id: 1, name: "Project A", status: "In Progress" },
        { id: 2, name: "Project B", status: "Completed" },
        { id: 3, name: "Project C", status: "Planning" },
      ])
      setProjects(data)
      setIsLoading(false)
    }

    fetchProjects()
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
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-muted-foreground">Status: {project.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

