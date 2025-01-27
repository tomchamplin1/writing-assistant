import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

import { Button } from "@/components/ui/button"
import AuthButtonClient from "@/components/AuthButtonClient"

import { SubmitButton } from "./submit-button"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Login({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  const signIn = async (formData: FormData) => {
    "use server"

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await (
      await supabase
    ).auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect("/login?message=Could not authenticate user")
    }

    return redirect("/account")
  }

  const signUp = async (formData: FormData) => {
    "use server"

    const origin = (await headers()).get("origin")
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const supabase = createClient()

    const { error } = await (
      await supabase
    ).auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/confirm`,
      },
    })

    if (error) {
      return redirect("/login?message=Could not authenticate user")
    }

    return redirect("/login?message=Check email to continue sign in process")
  }

  return (
    <div className="flex h-screen items-center">
      <div className="mx-auto flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
        <Link href="/" className="">
          <button className="bg-btn-background hover:bg-btn-background-hover items-left mt-2 flex rounded-md py-2 pr-2 text-sm text-foreground no-underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="my-auto mr-2 size-4 transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>{" "}
            Back
          </button>
        </Link>
        <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="mb-2 rounded-md bg-blue-800 px-4 py-2 text-white"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="mb-2 rounded-md border border-foreground/20 px-4 py-2 text-foreground"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
              {searchParams.message}
            </p>
          )}
        </form>
        <hr className="pb-2"></hr>
        <AuthButtonClient />
      </div>
    </div>
  )
}
