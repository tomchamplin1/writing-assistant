import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import prisma from "@/lib/db"

export default async function Stories() {
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
    <div className="container min-h-screen py-12">
      <div className="mx-auto">
        <h1 className="mb-12 text-center text-4xl font-bold">Stories</h1>
        {stories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg bg-zinc-900 shadow-lg transition-all duration-300"
                style={{ minHeight: "300px" }}
              >
                <div className="grow p-6">
                  <span className="pb-5 text-sm text-gray-400">
                    <p className="mb-3">
                      {new Date(story.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </span>
                  <h3 className="text-md mb-3 font-semibold text-gray-100">
                    {story.prompt}
                  </h3>
                  <p className="line-clamp-4 text-gray-300">{story.content}</p>
                </div>
                <div className="flex items-center justify-between bg-zinc-800 px-6 py-4">
                  <button className="text-gray-400 transition-colors duration-200 hover:text-white">
                    <Link href={`/story/${story.id}`}>Read more</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4">You haven&apos;t written any stories yet.</p>
            <Link href="/write">
              <p className="text-gray-400 transition-colors duration-200 hover:text-white">
                Write your first story!
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
