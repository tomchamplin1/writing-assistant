"use server"

import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

export default async function logout() {
  const supabase = createClient()
  const { error } = await (await supabase).auth.signOut()

  if (error) {
    return redirect("/message=Could not log out")
  }

  return redirect("/")
}
