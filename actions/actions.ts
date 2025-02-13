"use server"

import { createClient } from "@/utils/supabase/server"

import prisma from "@/lib/db"

export async function createStory(formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    console.log("You have to login to save stories")
    return { loading: false, success: false, error: "User not logged in" }
  }

  try {
    let dbUser = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
      console.error("User not found in the database. Unable to save the story.")
      return {
        loading: false,
        success: false,
        error: "User not found in the database",
      }
    }

    await prisma.story.create({
      data: {
        content: formData.get("story") as string,
        prompt: formData.get("prompt") as string,
        userId: user.id,
      },
    })

    console.log("Story created successfully")
    return { loading: false, success: true, error: null }
  } catch (error) {
    console.error("Error creating story:", error)
    return { loading: false, success: false, error: "Error creating story" }
  }
}
