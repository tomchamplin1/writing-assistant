"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

export default function GenerateButton({ onDataGenerated }) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: "hello",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate response")
      }

      const newData = await response.json()
      setData(newData) // Update the state with the new data
      onDataGenerated(newData) // Pass the data to the parent
    } catch (error) {
      console.error("Error generating response:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button
        variant="default"
        size="lg"
        className=""
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate a prompt"}
      </Button>
      <div className="mb-2 mt-5">{data && <p>{data.content[0].text} </p>}</div>
    </div>
  )
}
