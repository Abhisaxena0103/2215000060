import { NextResponse } from "next/server"

// Simulated database of posts
const posts = [
  {
    id: "1",
    content: "Just launched our new website! Check it out and let me know what you think.",
    author: {
      id: "1",
      name: "Alex Johnson",
      username: "@alex",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 24,
    comments: 5,
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: "2",
    content: "Our Q1 results are in and they're looking great! Revenue up 20% year-over-year.",
    author: {
      id: "2",
      name: "Sarah Williams",
      username: "@sarah",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 56,
    comments: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
  },
  {
    id: "3",
    content: "Excited to announce that we'll be attending the Tech Conference next month. Come say hi at booth #42!",
    author: {
      id: "3",
      name: "David Chen",
      username: "@david",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 89,
    comments: 23,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "4",
    content: "Just published a new blog post about our journey building the platform. Link in bio!",
    author: {
      id: "4",
      name: "Emily Rodriguez",
      username: "@emily",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 112,
    comments: 34,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
  {
    id: "5",
    content: "We're hiring! Looking for talented developers to join our growing team.",
    author: {
      id: "5",
      name: "Michael Taylor",
      username: "@michael",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 78,
    comments: 15,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
]

export async function GET() {
  // Sort posts by timestamp (newest first)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  return NextResponse.json(sortedPosts)
}
