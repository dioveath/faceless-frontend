import { Button } from "@/components/ui/button";
import { Tables } from "@/types/database.types";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Volume2, MoreVertical, Download, Trash2, Delete, Copy } from "lucide-react";
import { AudioItem } from "./audio-item";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useDeleteGenerationById } from "@/hooks/generations/use-generations";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface HistoryItemProps {
  item: Tables<"generations">;
}

export function HistoryItem({ item }: HistoryItemProps) {
  const title = JSON.parse(JSON.stringify(item.input_params))?.audio_settings?.text || item.id;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: deleteGeneration, isPending } = useDeleteGenerationById({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["audio-generations", item.user_id, 1, 5] });
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

  const handleDelete = async () => {
    await deleteGeneration(item.id);
  };

  return (
    <motion.div whileHover={{ scale: 0.98 }} className="p-2 rounded-lg hover:bg-muted/50 group">
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 group">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm truncate">{title}</p>
          <p className="text-xs text-muted-foreground">{item.updated_at}</p>
        </div>
        <motion.div initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }} className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy text
              </DropdownMenuItem>
              <DeleteAlertDialog handleDelete={handleDelete} loading={isPending} />
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
        </motion.div>
      </div>
      {item.status === "Completed" && item.output_url && <AudioItem audioUrl={item.output_url} />}
    </motion.div>
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
        <DropdownMenuItem disabled={loading} onSelect={(e) => e.preventDefault()}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete the audio generation and remove the data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
