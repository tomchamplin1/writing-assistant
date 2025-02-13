"use client"

import { useState } from "react"
import { createStory } from "@/actions/actions"
import { createClient } from "@/utils/supabase/client"

import prisma from "@/lib/db"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import GenerateButton from "@/components/Generate"
import TextBox from "@/components/Textbox"
import Timer from "@/components/Timer"

export default function IndexPage() {
  const { toast } = useToast()
  const [topics, setTopics] = useState("")
  const [storyContent, setStoryContent] = useState("")
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const handleDataGenerated = (data) => {
    setPrompt(data.content[0].text)
    console.log("Data received from GenerateButton:", prompt)
  }

  const saveStory = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("story", storyContent)
    formData.append("prompt", prompt)

    const result = await createStory(formData)

    setLoading(false)
    return result
  }

  const handleSave = async () => {
    const result = await saveStory()

    if (result?.success) {
      toast({
        title: "Story Saved",
        description: "Your story was successfully created.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to save the story. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Generate a writing prompt in seconds
        </h1>
        <GenerateButton onDataGenerated={handleDataGenerated} />
        <Timer />
        <div className="flex min-h-screen w-full flex-col">
          <form onSubmit={saveStory}>
            <div>
              <textarea
                className="w-full grow resize-none rounded-md border p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your text here..."
                aria-label="Large text input"
                name="story"
                rows={20}
                value={storyContent}
                onChange={(e) => setStoryContent(e.target.value)}
              />
            </div>
            <input type="hidden" name="prompt" value={prompt} />
            <Button
              type="button"
              onClick={handleSave} // Use the client-side function instead
              disabled={!prompt || !storyContent || loading}
            >
              {loading ? "Saving..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
      <div className="flex gap-4"></div>
    </section>
  )
}
