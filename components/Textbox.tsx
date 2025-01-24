"use client"

import React, { useState } from "react"

type TextBoxProps = {
  onTextChange: (text: string) => void
}

export default function TextBox({ onTextChange }: TextBoxProps) {
  const [text, setText] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value
    setText(newText)
    onTextChange(newText) // Pass the updated text to the parent
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <textarea
        className="w-full grow resize-none rounded-md border p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={handleChange}
        placeholder="Enter your text here..."
        aria-label="Large text input"
      />
      <div className="mt-4 text-sm text-gray-500">
        Character count: {text.length}
      </div>
    </div>
  )
}
