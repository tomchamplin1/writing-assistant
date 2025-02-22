import * as React from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import logout from "@/app/logout/page"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

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
        <div className=" h-full pl-5 hidden md:flex">
          <Link
            href="/"
            className={cn(
              "flex h-full items-center text-sm font-medium text-muted-foreground"
            )}
          >
            <Button
              variant={"ghost"}
              className="h-full rounded-none px-2 py-5 md:p-5"
            >
              Home
            </Button>
          </Link>
          {!user ? (
            <Link
              href="/login"
              className={cn(
                "flex h-full items-center text-sm font-medium text-muted-foreground"
              )}
            >
              <Button
                variant={"ghost"}
                className="h-full rounded-none px-2 py-5 md:p-5"
              >
                Stories
              </Button>
            </Link>
          ) : (
            <div className="flex h-full">
              <div className="flex h-full">
                <Link
                  href="/write"
                  className={cn(
                    "flex h-full items-center text-sm font-medium text-muted-foreground"
                  )}
                >
                  <Button
                    variant={"ghost"}
                    className="h-full rounded-none px-2 py-5 md:p-5"
                  >
                    Write
                  </Button>
                </Link>
              </div>
              <div className="flex h-full space-x-4">
                <Link
                  href="/stories"
                  className={cn(
                    "flex h-full items-center text-sm font-medium text-muted-foreground"
                  )}
                >
                  <Button
                    variant={"ghost"}
                    className="h-full rounded-none px-2 py-5 md:p-5"
                  >
                    Stories
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="flex h-full flex-1 items-center justify-end">
          <nav className="h-full items-center hidden md:flex">
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
                  "flex h-full items-center text-sm font-medium text-muted-foreground"
                )}
              >
                <Button
                  variant={"ghost"}
                  className="h-full rounded-none px-2 py-5 md:p-5"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <div className="flex">
                <Button
                  variant={"ghost"}
                  className="h-full rounded-none px-2 py-5 md:p-5"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
            <ThemeToggle />
          </nav>
        </div>
        <div className="flex md:hidden h-full p-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link
                href="/"
                className={cn("text-sm font-medium text-muted-foreground")}
              >
                <DropdownMenuItem>Home</DropdownMenuItem>
              </Link>
              {!user ? (
                <Link
                  href="/login"
                  className={cn("text-sm font-medium text-muted-foreground")}
                >
                  <DropdownMenuItem>Stories</DropdownMenuItem>
                </Link>
              ) : (
                <div>
                  <Link
                    href="/write"
                    className={cn("text-sm font-medium text-muted-foreground")}
                  >
                    <DropdownMenuItem>Write</DropdownMenuItem>
                  </Link>
                  <Link
                    href="/stories"
                    className={cn("text-sm font-medium text-muted-foreground")}
                  >
                    <DropdownMenuItem>Stories</DropdownMenuItem>
                  </Link>
                </div>
              )}
              {!user ? (
                <Link
                  href="/login"
                  className={cn("text-sm font-medium text-muted-foreground")}
                >
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
              ) : (
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
