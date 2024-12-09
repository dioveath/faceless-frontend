"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import Link from "next/link";
import { Tables } from "@/types/database.types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useTaskById } from "@/hooks/task/use-task";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteGenerationById } from "@/hooks/generations/use-generations";
import { useToast } from "@/hooks/use-toast";

type Generation = Tables<"generations">;

interface VideoTaskCardProps {
  generation: Generation;
}

export function VideoTaskDetails({ generation }: VideoTaskCardProps) {
  const { toast } = useToast();
  const statusColor =
    {
      Processing: "bg-blue-500",
      Completed: "bg-green-500",
      Failed: "bg-red-500",
    }[generation.status.toString() || ""] || "bg-gray-500";
  const queryClient = useQueryClient();
  const { data: task, isPending: isTaskPending, error: taskError } = useTaskById(generation?.background_task_id || "", { enabled: !!generation.background_task_id, refetchInterval: 1000 });

  const { mutateAsync, isPending } = useDeleteGenerationById({
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      toast({
        title: "Success",
        description: "Generation deleted successfully",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete generation: " + error.message,
        variant: "destructive",
      });
    },
  });

  const deleteGeneration = async (generationId: string) => {
    await mutateAsync(generationId);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Task {generation.id}</span>
          <Badge className={statusColor}>{generation.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative space-y-6">
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
          {generation.status === "Completed" && generation.output_url ? (
            <video src={generation.output_url} controls className="w-full h-full object-cover">
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                {isTaskPending && <div className="text-4xl font-bold mb-4">Processing...</div>}
                {taskError && <div className="text-4xl font-bold mb-4">Error</div>}
                {!isTaskPending && !taskError && (
                  <div className="space-y-2">
                    <div className="text-4xl font-bold mb-4">{task?.progress}%</div>
                    <p className="text-muted-foreground">{task.message}</p>
                    <Progress value={task?.progress || 0} className="w-64 mx-auto" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Created:</strong> {new Date(generation.created_at).toLocaleString()}
          </div>
          <div>
            <strong>User ID:</strong> {generation.user_id || "N/A"}
          </div>
          <div>
            <strong>Status:</strong> {generation.status}
          </div>
          <div>
            {task && (
              <>
                <strong>Progress:</strong> {task?.progress}%
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Link href={generation.output_url ? generation.output_url : "#"} passHref>
          <Button variant="outline" disabled={!generation.output_url}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </Link>
        <DeleteAlertDialog handleDelete={() => deleteGeneration(generation.id)} loading={isPending} />
      </CardFooter>
    </Card>
  );
}

type DeleteAlertDialogProps = {
  handleDelete: () => void;
  loading: boolean;
};

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
          <AlertDialogDescription>This action cannot be undone. This will permanently delete the video generation task and remove the data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
