import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import prisma from "@/lib/db"
import { Button } from "@/components/ui/button"
import DeleteButton from "@/components/DeleteButton"

export default async function Story({ params }) {
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
        <Link href="/account">
          <Button
            variant="ghost"
            className="mb-4 text-gray-400 transition-colors duration-200 hover:text-white"
          >
            &lt;- Back
          </Button>
        </Link>
        <div className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl">
          <div className="p-6">
            <p className="mb-3">
              {new Date(story.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h3 className="mb-3 text-lg font-semibold text-gray-100">
              {story.prompt}
            </h3>
            <p className="whitespace-pre-wrap text-gray-300">{story.content}</p>
          </div>
        </div>
        <div className="mt-4">
          <DeleteButton storyID={storyID} />
        </div>
      </div>
    </div>
  )
}
