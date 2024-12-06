"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Volume2, MoreVertical, Download } from "lucide-react";
import { useAllAudioGenerationsByCurrentUser } from "@/hooks/generations/use-generations";
import { Tables } from "@/types/database.types";
import { AudioItem } from "./audio-item";

export default function HistoryTab() {
  const { data: pageData, isPending, isFetching, error, fetchNextPage } = useAllAudioGenerationsByCurrentUser();
  const [pageIndex, setPageIndex] = React.useState(1);

  if (isPending || isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const page = pageData?.pages[pageIndex - 1];
  const totalPages = Math.ceil(page?.totalCount / 10); // Assuming 10 items per page which is default

  const handleNextPage = () => {
    if (pageIndex >= totalPages) return;
    fetchNextPage();
    setPageIndex(pageIndex + 1);
  };
  const handlePreviousPage = () => setPageIndex((prev) => prev - 1);

  return (
    <TabsContent value="history" className="h-[calc(100%-40px)] overflow-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-2 h-full">
        {page.data.map((item, index) => (
          <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }}>
            <HistoryItem item={item} />
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }} className="flex justify-between items-center pt-4">
          <Button type="button" variant="outline" size="sm" onClick={handlePreviousPage} disabled={pageIndex === 1}>
            Previous
          </Button>
          <p className="text-sm text-muted-foreground">
            {pageIndex} of {totalPages}
          </p>
          <Button type="button" variant="outline" size="sm" onClick={handleNextPage} disabled={pageIndex === totalPages}>
            Next
          </Button>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
}

interface HistoryItemProps {
  item: Tables<"generations">;
}

function HistoryItem({ item }: HistoryItemProps) {
  const title = JSON.parse(JSON.stringify(item.input_params))?.audio_settings?.text || item.id;

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
        <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Copy text</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
        </motion.div>
        </div>
        { item.status === "Completed" && item.output_url && <AudioItem audioUrl={item.output_url} /> }
      </motion.div>
  );
}
