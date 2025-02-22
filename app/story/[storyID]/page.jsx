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
    <div className="container min-h-screen py-12 border-l border-r">
      <div className="mx-auto">
        <div className="flex justify-between">
          <div>
            <Link href="/stories">
              <Button
                variant="outline"
                className="mb-4 text-gray-400 transition-colors duration-200 hover:text-white"
              >
                &lt;- Back
              </Button>
            </Link>
          </div>
          <div className="">
            <DeleteButton storyID={storyID} />
          </div>
        </div>
        <div className="overflow-hidden ">
          <div className="">
            <p className="mb-3 text-sm ">
              {new Date(story.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h3 className="mb-3 text-lg font-semibold ">{story.prompt}</h3>
            <hr className="mb-3"></hr>
            <p className="whitespace-pre-wrap ">{story.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
