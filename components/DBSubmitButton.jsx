import { createClient } from "@/utils/supabase/server"

import { Button } from "@/components/ui/button"

export default function DBSubmitButton({ storyContent, prompt }) {
  const saveStory = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.log("No user found, redirecting to login")
      // return redirect("/login")
    }

    if (user) {
      let dbUser = await prisma.users.findUnique({
        where: {
          id: user.id,
        },
      })

      if (dbUser) {
        await prisma.story.create({
          data: {
            content: storyContent,
            prompt: prompt,
            userId: user.id,
          },
        })
        console.log("Story created successfully")
      } else {
        console.log("No user found in the database")
      }
    }
  }

  return <Button onClick={saveStory}>Submit</Button>
}
