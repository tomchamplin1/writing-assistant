"use client"

import { create } from "domain"
import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "./ui/button"

export default function AuthButtonClient() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3001/auth/confirm",
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    window.location.href = "/"
  }

  return (
    <Button
      onClick={handleSignIn}
      variant="ghost"
      size="sm"
      className="text-md hidden border border-gray-500 px-4 py-5 text-gray-700 lg:flex"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-google mr-2"
        viewBox="0 0 16 16"
      >
        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
      </svg>
      Sign in with Google
    </Button>
  )
}
