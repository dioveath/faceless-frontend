import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getErrorRedirect } from "@/utils/redirect-toaster-helpers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("We're at getting code");

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // http://localhost:3000/auth/auth-code-error#error=server_error&error_code=unexpected_failure&error_description=Database+error+saving+new+user
  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  // const errorDescription = searchParams.get("error_description");

  // If there's no code or an error occurred, redirect to an error page
  const errorRedirect = getErrorRedirect(`${origin}/auth/login`, error || errorCode || "An unknown error", "Please try again later or contact support.");
  return NextResponse.redirect(errorRedirect);
}
