"use client";

import { useState, useEffect } from "react";

export function useCustomSearchParams() {
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    const updateParams = () => {
      const currentParams = new URLSearchParams(window.location.search);
      setParams(currentParams);
    };

    updateParams();

    window.addEventListener("popstate", updateParams);
    return () => {
      window.removeEventListener("popstate", updateParams);
    };
  }, []);

  return { searchParams: params };
}
