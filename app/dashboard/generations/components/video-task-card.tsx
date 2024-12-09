import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import Link from "next/link";
import { Tables } from "@/types/database.types";
import { useTaskById } from "@/hooks/task/use-task";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteGenerationById } from "@/hooks/generations/use-generations";
import { useToast } from "@/hooks/use-toast";

type Generation = Tables<"generations">;

interface VideoTaskCardProps {
  generation: Generation;
}

export function VideoTaskCard({ generation }: VideoTaskCardProps) {
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
      })
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete generation: " + error.message,
        variant: "destructive",
      })
    },
  });

  const deleteGeneration = async (generationId: string) => {
    await mutateAsync(generationId);
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <Link href={`/dashboard/generations/${generation.id}`}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span className="truncate">Task {generation.id.slice(0, 8)}</span>
            <Badge className={statusColor}>{generation.status}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Progress</span>
                {isTaskPending && <span>Loading...</span>}
                {task && <span>{task.progress}%</span>}
              </div>
              {isTaskPending && <Progress value={0} />}
              {task && <Progress value={task.progress} />}
            </div>
            <div className="text-sm">
              <p>
                <strong>Created:</strong> {new Date(generation.created_at).toLocaleString()}
              </p>
              <p>
                <strong>User ID:</strong> {generation.user_id || "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between">
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
