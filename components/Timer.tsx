"use client"

import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [inputTime, setInputTime] = useState<string>("")

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const handleStart = () => {
    if (time > 0) {
      setIsActive(true)
    }
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setTime(0)
    setInputTime("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const seconds = parseInt(inputTime) * 60
    if (!isNaN(seconds) && seconds > 0) {
      setTime(seconds)
      setInputTime("")
    }
  }

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-3xl rounded-none">
      <CardContent className="p-2">
        <div className="md:flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold dark:text-gray-200">Timer</h2>
            <div
              className="text-3xl font-bold dark:text-gray-100"
              aria-live="polite"
            >
              {formatTime(time)}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center md:py-0 py-2 md:space-x-2"
          >
            <Label htmlFor="minutes" className="sr-only">
              Set timer (minutes)
            </Label>
            <Input
              type="number"
              id="minutes"
              placeholder="Minutes"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              min="1"
              className="max-w-28 rounded-none text-sm"
            />
            <Button type="submit" size="sm" className="rounded-none">
              Set
            </Button>
          </form>
          <div className="flex space-x-2">
            <Button
              onClick={handleStart}
              disabled={isActive || time === 0}
              size="sm"
              className="rounded-none"
            >
              Start
            </Button>
            <Button
              onClick={handlePause}
              disabled={!isActive}
              size="sm"
              className="rounded-none"
            >
              Pause
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="rounded-none"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Timer
