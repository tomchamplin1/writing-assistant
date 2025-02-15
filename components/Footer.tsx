import React from "react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <div>
      <hr></hr>
      <footer id="contact" className="bg-background px-2.5 py-5 md:px-40">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="mb-5 flex items-center">
              <p className="my-auto text-sm lg:text-lg">PenpalAI</p>
            </Link>
            <p className="max-w-xs text-sm ">
              Instantly generate unique prompts to spark your next story
            </p>
          </div>
          <div className="grid gap-8 sm:gap-6">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest ">
                Navigation
              </h2>
              <ul className="text-xs tracking-widest">
                <li className="mb-4 hover:text-zinc-200">
                  <Link href="/" className="hover:underline">
                    HOME
                  </Link>
                </li>
                <li className="mb-4 hover:text-zinc-200">
                  <Link href="/write" className="hover:underline">
                    WRITE
                  </Link>
                </li>
                <li className="mb-4 hover:text-zinc-200">
                  <Link href="/account" className="hover:underline">
                    ACCOUNT
                  </Link>
                </li>
                {/* <li className="mb-4">
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
              </li> */}
                {/* <li className="mb-4">
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li> */}
                {/* <li className="mb-4">
                <Link href="/contact" className="hover:underline">
                  CONTACT
                </Link>
              </li> */}
                {/* <li className="mb-4 hover:text-zinc-200">
                  <Link href="/blog" className="hover:underline">
                    BLOG
                  </Link>
                </li> */}
              </ul>
            </div>
            {/* <div>
              <h2 className="text-zinc-800 mb-6 text-sm font-semibold uppercase tracking-widest">
                Topics
              </h2>
              <ul className="text-xs tracking-widest">
                <li className="mb-4 hover:text-zinc-200">
                  <p>BABY & KIDS</p>
                </li>
                <li className="mb-4 hover:text-zinc-200">
                  <p>HOME</p>
                </li>
                <li className="mb-4 hover:text-zinc-200">
                  <p>BODY & BEAUTY</p>
                </li>
                <li className="mb-4 hover:text-zinc-200">
                  <p>FOOD & FITNESS</p>
                </li>
              </ul>
            </div> */}
            {/* <div>
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest ">
                Contact Us
              </h2>
              <ul className="text-xs tracking-widest">
                <li className="mb-4">
                  <Link
                    href="mailto:hello@jobboard.com"
                    className="hover:text-zinc-200 hover:underline"
                  >
                    HELLO@JOBBOARD.COM
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="mb-2 sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-zinc-400 sm:text-center">
            © 2025{" "}
            <Link href="/" className="hover:underline">
              Arx Solutions LLC™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}
