import Anthropic from "@anthropic-ai/sdk"
import dotenv from "dotenv"

dotenv.config()

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// export async function main({ userMessage }) {
//   const message = await client.messages.create({
//     max_tokens: 1024,
//     messages: [{ role: "user", content: { userMessage } }],
//     model: "claude-3-haiku-20240307",
//   })

//   console.log(message.content)
// }

// main()
