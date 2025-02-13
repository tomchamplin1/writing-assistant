import * as React from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import logout from "@/app/logout/page"

export async function SiteHeader() {
  const supabase = createClient()
  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <span className="inline-block font-bold">PenpalAI</span>
        </Link>
        <div className="flex space-x-4 pl-5">
          <Link
            href="/"
            className={cn(
              "flex items-center text-sm font-medium text-muted-foreground"
            )}
          >
            <Button variant={"ghost"}>Home</Button>
          </Link>
          {!user ? (
            <Link
              href="/login"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground"
              )}
            >
              <Button variant={"ghost"}>Account</Button>
            </Link>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/account"
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground"
                )}
              >
                <Button variant={"ghost"}>Account</Button>
              </Link>
            </div>
          )}
        </div>

        {/* <MainNav items={siteConfig.mainNav} /> */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="size-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link> */}
            {/* <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="size-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link> */}
            {!user ? (
              <Button
                variant={"ghost"}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground"
                )}
              >
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <div className="flex space-x-4">
                <Button
                  variant={"ghost"}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground"
                  )}
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
