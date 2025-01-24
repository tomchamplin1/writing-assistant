import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

import prisma from "@/lib/db"

export async function GET() {
  const supabase = createClient()
  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    // return redirect("/login")
    console.log("no supabase user found")
  }

  if (user) {
    let dbUser = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      dbUser = await prisma.users.create({
        data: {
          id: user.id,
          email: user.email ?? "",
          name: user.user_metadata.full_name ?? "",
          picture: user.user_metadata.avatar_url ?? "",
        },
      })
      console.log("user created!", dbUser)
    }

    return NextResponse.redirect("http://localhost:3001/")
  }
}
