import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import prisma from "@/lib/db"

export default async function Account() {
  const supabase = createClient()
  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  const stories = await prisma.story.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <div className="min-h-screen px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-center text-4xl font-bold">My Stories</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <span className="mb-5 text-sm text-gray-400">
                  {new Date(story.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(story.updatedAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <h3 className="text-md mb-3 font-semibold text-gray-100">
                  {story.prompt}
                </h3>
                <p className="line-clamp-4 text-gray-300">{story.content}</p>
              </div>
              <div className="flex items-center justify-between bg-gray-700 px-6 py-4">
                <button className="text-gray-400 transition-colors duration-200 hover:text-white">
                  <Link href={`/story/${story.id}`}>Read more</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
