import { redirect } from "next/navigation"
import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { type EmailOtpType } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const url = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const code = searchParams.get("code")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/"

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect("/api/auth/creation")
    }
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host") // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development"

      const redirectUrl = isLocalEnv
        ? `http://localhost:3000/api/auth/creation` // Local Dev
        : `https://${forwardedHost || url.host}/api/auth/creation` // Production

      return NextResponse.redirect(redirectUrl)
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error")
}
