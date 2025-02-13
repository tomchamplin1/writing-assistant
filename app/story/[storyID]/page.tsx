import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import prisma from "@/lib/db"

interface PageProps {
  params: {
    storyID: string
  }
}

export default async function Story({ params }: PageProps) {
  const storyID = params?.storyID

  const supabase = createClient()
  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  const story = await prisma.story.findUnique({
    where: {
      id: storyID,
    },
  })

  if (!story) {
    return redirect("/error")
  }

  return (
    <div className="min-h-screen px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="p-6">
            <h3 className="text-md mb-3 font-semibold text-gray-100">
              {story.prompt}
            </h3>
            <p className="text-gray-300">{story.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
