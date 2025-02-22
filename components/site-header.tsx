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
    <header className="sticky top-0 z-40 size-full border-b bg-background">
      <div className="container flex h-full items-center space-x-4 border-x sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <span className="inline-block font-bold">PenpalAI</span>
        </Link>
        <div className="flex pl-5 h-full">
          <Link
            href="/"
            className={cn(
              "flex items-center text-sm font-medium text-muted-foreground h-full"
            )}
          >
            <Button variant={"ghost"} className="rounded-none p-5 h-full">
              Home
            </Button>
          </Link>
          {!user ? (
            <Link
              href="/login"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground h-full"
              )}
            >
              <Button variant={"ghost"} className="rounded-none p-5 h-full">
                Stories
              </Button>
            </Link>
          ) : (
            <div className="flex h-full">
              <div className="flex h-full">
                <Link
                  href="/write"
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground h-full"
                  )}
                >
                  <Button variant={"ghost"} className="rounded-none p-5 h-full">
                    Write
                  </Button>
                </Link>
              </div>
              <div className="flex space-x-4 h-full">
                <Link
                  href="/stories"
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground h-full"
                  )}
                >
                  <Button variant={"ghost"} className="rounded-none p-5 h-full">
                    Stories
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* <MainNav items={siteConfig.mainNav} /> */}
        <div className="flex flex-1 items-center justify-end h-full">
          <nav className="flex items-center h-full">
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
              <Link
                href="/login"
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground h-full"
                )}
              >
                <Button variant={"ghost"} className="rounded-none p-5 h-full">
                  Login
                </Button>
              </Link>
            ) : (
              <div className="flex">
                <Button
                  variant={"ghost"}
                  className="rounded-none p-5 h-full"
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
