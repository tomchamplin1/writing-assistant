"use server"

import { createClient } from "@/utils/supabase/server"

import prisma from "@/lib/db"

export async function createStory(formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    return { loading: false, success: false, error: "User not logged in" }
  }

  try {
    let dbUser = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    })

    if (!dbUser) {
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

export async function deleteStory(storyId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    return { loading: false, success: false, error: "User not logged in" }
  }

  try {
    let dbUser = await prisma.users.findUnique({
      where: { id: user.id },
    })

    if (!dbUser) {
      return {
        loading: false,
        success: false,
        error: "User not found in the database",
      }
    }

    const deletedStory = await prisma.story.delete({
      where: {
        id: storyId,
        userId: user.id,
      },
    })

    console.log("Story deleted successfully:", deletedStory.id)
    return { loading: false, success: true, error: null }
  } catch (error) {
    console.error("Error deleting story:", error)
    return { loading: false, success: false, error: "Error deleting story" }
  }
}
