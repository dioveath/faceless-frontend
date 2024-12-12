"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Icons } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

export default function GoogleLoginButton() {
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const supabase = createClient();

  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // NOTE: replace window.location.origin with NEXT_PUBLIC_SITE_URL
          redirectTo: `${window.location.origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        title: "Please try again.",
        description: "There was an error logging in with Google.",
        variant: "destructive",
      });
      setIsGoogleLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={signInWithGoogle}
      disabled={isGoogleLoading}
      className="w-full"
    >
      {isGoogleLoading ? (
        <Icons.loaderCircle className="mr-2 size-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 size-6" />
      )}
      Sign in with Google
    </Button>
  );
}