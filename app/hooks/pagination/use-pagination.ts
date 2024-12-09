import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const usePagination = (defaultPage = 1, defaultLimit = 5) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage = Number(searchParams.get("page") || defaultPage);
  const limit = Number(searchParams.get("limit") || defaultLimit);
  const [pageIndex, setPageIndex] = useState(initialPage);

  // Update the query params whenever pageIndex changes
  useEffect(() => {
    router.push(`?page=${pageIndex}&limit=${limit}`, { scroll: false });
  }, [pageIndex, limit, router]);

  const nextPage = () => setPageIndex((prev) => prev + 1);
  const previousPage = () => setPageIndex((prev) => Math.max(1, prev - 1));

  return {
    pageIndex,
    limit,
    setPageIndex,
    nextPage,
    previousPage,
  };
};
