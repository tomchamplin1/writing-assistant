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
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">My Stories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-md font-semibold mb-3 text-gray-100">
                  {story.prompt}
                </h3>
                <p className="text-gray-300 line-clamp-4">{story.content}</p>
              </div>
              <div className="bg-gray-700 px-6 py-4">
                <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
