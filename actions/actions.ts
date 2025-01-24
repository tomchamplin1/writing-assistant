"use server"

import { createClient } from "@/utils/supabase/server"

import prisma from "@/lib/db"

export async function createStory(formData: FormData) {
  const supabase = createClient()

  // Get the current authenticated user from Supabase
  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    console.log("You have to login to save stories")
    // You can redirect the user to login here if needed
    return
  }

  try {
    // Check if the user exists in the database
    let dbUser = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    })

    // If the user doesn't exist in the database, handle the error or create a new user
    if (!dbUser) {
      console.error("User not found in the database. Unable to save the story.")
      return
    }

    // Save the story in the database
    await prisma.story.create({
      data: {
        content: formData.get("story") as string,
        prompt: formData.get("prompt") as string,
        userId: user.id, // Ensure this matches the `id` of an existing user
      },
    })

    console.log("Story created successfully")
  } catch (error) {
    console.error("Error creating story:", error)
  }
}
