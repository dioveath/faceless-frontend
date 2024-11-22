import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
 
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
 
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"
 
  if (code) {
    const supabase = await createClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
 
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }
 
  // If there's no code or an error occurred, redirect to an error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}