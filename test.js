import Anthropic from "@anthropic-ai/sdk"
import dotenv from "dotenv"

dotenv.config()

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

client

const msg = await anthropic.messages.create({
  model: "claude-3-haiku-20240307",
  max_tokens: 1000,
  temperature: 0,
  system: "Respond only with short poems.",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Why is the ocean salty?",
        },
      ],
    },
  ],
})
console.log(msg)
