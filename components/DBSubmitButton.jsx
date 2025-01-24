import { Button } from "@/components/ui/button"

export default function DBSubmitButton({ storyContent, prompt }) {
  const handleSave = async () => {
    if (!storyContent || !prompt) {
      console.error("Story content and prompt are required to save the story")
      return
    }

    try {
      const response = await fetch("/api/saveStory/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyContent, prompt }),
      })

      // Check if the response is not OK
      if (!response.ok) {
        const text = await response.text() // Capture the raw response as text
        console.error("API returned an error:", text)
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Story saved successfully:", result)
    } catch (error) {
      console.error("Error saving story:", error)
    }
  }

  return (
    <Button onClick={handleSave} disabled={!storyContent || !prompt}>
      Save
    </Button>
  )
}
