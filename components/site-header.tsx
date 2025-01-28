import * as React from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
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
          <span className="inline-block font-bold">PromptAssist</span>
        </Link>
        <div className="pl-5 flex space-x-4">
          <Button>
            <Link
              href="/"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground"
              )}
            >
              Home
            </Link>
          </Button>
          {!user ? (
            <Button>
              <Link
                href="/login"
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground"
                )}
              >
                Login
              </Link>
            </Button>
          ) : (
            <Button
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground"
              )}
              onClick={logout}
            >
              Logout
            </Button>
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
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
