"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteStory } from "@/actions/actions"

import { Button } from "@/components/ui/button"

export default function DeleteButton({ storyID }: { storyID: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this story?")) return

    setLoading(true)
    const response = await deleteStory(storyID)

    if (response.success) {
      router.push("/account") // Redirect on success
    } else {
      alert("Failed to delete story: " + response.error)
    }
    setLoading(false)
  }

  return (
    <Button
      variant="outline"
      className="text-gray-400 transition-colors duration-200 hover:text-white"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete Story"}
    </Button>
  )
}
