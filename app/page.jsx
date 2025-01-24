"use client"

import { useState } from "react"
import { createStory } from "@/actions/actions"
import { createClient } from "@/utils/supabase/client"

import prisma from "@/lib/db"
import { Button } from "@/components/ui/button"
import GenerateButton from "@/components/Generate"
import TextBox from "@/components/Textbox"
import Timer from "@/components/Timer"

export default function IndexPage() {
  const [topics, setTopics] = useState("")
  const [storyContent, setStoryContent] = useState("")
  const [prompt, setPrompt] = useState("")

  const handleDataGenerated = (data) => {
    setPrompt(data.content[0].text)
    console.log("Data received from GenerateButton:", prompt)
  }

  const handleTextChange = (newText) => {
    setStoryContent(newText)
    console.log("Current text:", storyContent)
  }

  const handleTopicsChange = (event) => {
    setTopics(event.target.value)
  }

  const saveStory = async () => {
    const supabase = createClient()
    const {
      data: { user },
    } = await (await supabase).auth.getUser()

    // if (!user) {
    //   return redirect("/login")
    // }

    if (user) {
      story = await prisma.story.create({
        data: {
          content: storyContent,
          prompt: prompt,
          userId: user,
        },
      })
      console.log("story created", story)
    } else {
      console.log("no story found")
    }
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Generate a writing prompt in seconds
        </h1>
        <h2 className="mb-2 text-lg font-semibold">
          Are there any topics you&apos;d like to write about?
        </h2>
        <input
          value={topics}
          onChange={handleTopicsChange}
          type="text"
          placeholder="Enter topics (optional)"
          className="w-48 rounded-md border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Writing topics"
        />
        <GenerateButton onDataGenerated={handleDataGenerated} />
        <Timer />
        <div className="flex min-h-screen w-full flex-col">
          <form action={createStory}>
            {/* <TextBox name="story" /> */}
            <div>
              <textarea
                className="w-full grow resize-none rounded-md border p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your text here..."
                aria-label="Large text input"
                name="story"
                rows={20}
              />
            </div>
            {/* <textarea name="story" rows={5} placeholder="content"></textarea> */}
            <input type="hidden" name="prompt" value={prompt} />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
      <div className="flex gap-4"></div>
    </section>
  )
}
