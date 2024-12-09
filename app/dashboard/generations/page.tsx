"use client";

import { VideoTaskCard } from "./components/video-task-card";
import { useAllVideoGenerationsByCurrentUser } from "@/hooks/generations/use-generations";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { usePagination } from "@/hooks/pagination/use-pagination";

export default function Page() {
  const { pageIndex, limit, nextPage, previousPage } = usePagination();
  const { data: pageData, isPending, isFetching, error, fetchNextPage, fetchPreviousPage } = useAllVideoGenerationsByCurrentUser(pageIndex, limit);

  if (isPending || isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const page = pageData?.pages.find((page) => page.page === pageIndex);
  const totalPages = Math.ceil((page?.totalCount || 0) / limit);

  const handleNextPage = () => {
    if (pageIndex >= totalPages) return;
    fetchNextPage();
    nextPage();
  };
  const handlePreviousPage = () => {
    if (pageIndex === 1) return;
    fetchPreviousPage();
    previousPage();
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {page?.data.map((generation) => (
          <VideoTaskCard key={generation.id} generation={generation} />
        ))}
      </div>
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
    </>
  );
}
