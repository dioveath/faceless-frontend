"use client";

import { useParams } from "next/navigation";
import { VideoTaskDetails } from "./component/video-task-details";
import { useGenerationById } from "@/hooks/generations/use-generations";

export default function Page() {
  const { id } = useParams();
  const { data, isLoading, error } = useGenerationById(Array.isArray(id) ? id[0] : id || "", { enabled: !!id, refetchInterval: 1000 });

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && <VideoTaskDetails generation={data} />}
    </div>
  );
}
