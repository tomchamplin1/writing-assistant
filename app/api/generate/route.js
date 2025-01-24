// /app/api/generate/route.js
import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import dotenv from "dotenv"

dotenv.config()

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request) {
  try {
    const { userMessage } = await request.json()

    if (!userMessage) {
      return NextResponse.json(
        { error: "User message is required" },
        { status: 400 }
      )
    }

    // if (timerValue) {
    //   msg.system += ` The writer has ${timerValue} minutes to write.`
    // }

    const randomSeed = Math.floor(Math.random() * 1000)
    const temperature = Math.random() * 1

    const msg = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1000,
      temperature: temperature,
      system: `You are an AI assistant with a passion for creative writing and storytelling. Your task is to collaborate with users to create engaging stories, offering imaginative plot twists and dynamic character development. Encourage the user to contribute their ideas and build upon them to create a captivating narrative. Respond only with the writing prompt and no intro.`,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userMessage,
            },
          ],
        },
      ],
    })

    return NextResponse.json(msg, { status: 200 })
  } catch (error) {
    console.error("Error in API handler:", error)
    return NextResponse.json(
      { error: "Failed to process the request", details: error.message },
      { status: 500 }
    )
  }
}
