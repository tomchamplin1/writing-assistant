import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container flex min-h-screen flex-col items-center justify-center border-l border-r bg-gradient-to-b from-background to-secondary/20 px-4 py-16">
      <div className="max-w-3xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Unlock Your Imagination with{" "}
          <span className="text-primary">AI-Powered Writing Prompts 🖊️</span>
        </h1>
        <p className="text-xl text-muted-foreground md:text-2xl">
          Instantly generate unique prompts to spark your next story
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/write">
            <Button size="lg" className="w-full sm:w-auto rounded-none">
              Get started <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
          {/* <Link href="/about">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn more
            </Button>
          </Link> */}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    title: "AI-Powered Prompts",
    description:
      "Generate unique writing prompts tailored to your preferences.",
  },
  {
    title: "Boost Creativity",
    description: "Overcome writer's block and explore new story ideas.",
  },
  {
    title: "Easy to Use",
    description: "Simple interface for seamless prompt generation and writing.",
  },
]
