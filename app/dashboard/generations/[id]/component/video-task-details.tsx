"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Database } from "@/types/database.types"
import { downloadLinkForTask } from "@/utils/api/task"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useDeleteTaskById } from "@/hooks/task/use-task"
import { useQueryClient } from "@tanstack/react-query"

type Task = Database["public"]["Tables"]["tasks"]["Row"]

interface VideoTaskCardProps {
    task: Task
}

export function VideoTaskDetails({ task }: VideoTaskCardProps) {
    const statusColor = {
        processing: "bg-blue-500",
        completed: "bg-green-500",
        failed: "bg-red-500",
    }[task.status || ""] || "bg-gray-500"

    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useDeleteTaskById({
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["available-tasks"] })
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const deleteTask = async (taskId: string) => {
        await mutateAsync(taskId)
    }

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Task {task.id}</span>
                    <Badge className={statusColor}>{task.status}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    {task.status === "completed" && task.file_path ? (
                        <video
                            src={downloadLinkForTask(task)}
                            controls
                            className="w-full h-full object-cover"
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-4">{task.progress}%</div>
                                <Progress value={task.progress} className="w-64 mx-auto" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <strong>Created:</strong> {new Date(task.created_at).toLocaleString()}
                    </div>
                    <div>
                        <strong>User ID:</strong> {task.user_id || "N/A"}
                    </div>
                    <div>
                        <strong>Status:</strong> {task.status}
                    </div>
                    <div>
                        <strong>Progress:</strong> {task.progress}%
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <Link href={task.file_path ? downloadLinkForTask(task) : "#"} passHref>
                    <Button
                        variant="outline"
                        disabled={!task.file_path}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </Link>
                <DeleteAlertDialog handleDelete={() => deleteTask(task.id)} loading={isPending} />
            </CardFooter>
        </Card>
    )
}

type DeleteAlertDialogProps = {
    handleDelete: () => void
    loading: boolean
}

const DeleteAlertDialog = ({ handleDelete, loading }: DeleteAlertDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={loading}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the video generation task
                        and remove the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}