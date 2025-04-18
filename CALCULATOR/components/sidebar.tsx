"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, LineChart, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Top Users", href: "/top-users", icon: Users },
  { name: "Trending Posts", href: "/trending-posts", icon: BarChart3 },
  { name: "Feed", href: "/feed", icon: LineChart },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BarChart3 className="h-6 w-6" />
            <span>Social Analytics</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {links.map((link) => {
              const LinkIcon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    pathname === link.href ? "bg-gray-200 text-primary dark:bg-gray-800" : "text-muted-foreground",
                  )}
                >
                  <LinkIcon className="h-4 w-4" />
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
