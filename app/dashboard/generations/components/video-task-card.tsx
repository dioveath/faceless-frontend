import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Trash2 } from 'lucide-react'
import Link from "next/link"
import { Database } from "@/types/database.types"
import { useDeleteTaskById } from "@/hooks/task/use-task"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { downloadLinkForTask } from "@/utils/api/task"



type Task = Database["public"]["Tables"]["tasks"]["Row"]

interface VideoTaskCardProps {
    task: Task
}

export function VideoTaskCard({ task }: VideoTaskCardProps) {
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

        <Card className="transition-shadow hover:shadow-lg">
            <Link href={`/dashboard/generations/${task.id}`}>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span className="truncate">Task {task.id.slice(0, 8)}</span>
                        <Badge className={statusColor}>{task.status}</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} />
                        </div>
                        <div className="text-sm">
                            <p>
                                <strong>Created:</strong>{" "}
                                {new Date(task.created_at).toLocaleString()}
                            </p>
                            <p>
                                <strong>User ID:</strong> {task.user_id || "N/A"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Link>
            <CardFooter className="flex justify-between">
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