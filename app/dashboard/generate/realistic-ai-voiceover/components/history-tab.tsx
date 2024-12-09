"use client";

import React from "react";
import { motion } from "framer-motion";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAllAudioGenerationsByCurrentUser } from "@/hooks/generations/use-generations";
import { HistoryItem } from "./history-item";


export default function HistoryTab() {
  const { data: pageData, isPending, isFetching, error, fetchNextPage } = useAllAudioGenerationsByCurrentUser(1, 5);
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

