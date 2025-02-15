import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

import prisma from "@/lib/db"

export async function GET(request: Request) {
  const supabase = createClient()
  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    const baseUrl = new URL(request.url).origin
    return NextResponse.redirect(`${baseUrl}/login`)
  }

  let dbUser = await prisma.users.findUnique({
    where: { id: user.id },
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
  }

  const baseUrl = new URL(request.url).origin
  return NextResponse.redirect(`${baseUrl}/`)
}
