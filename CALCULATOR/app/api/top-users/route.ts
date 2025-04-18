import { NextResponse } from "next/server"

// Simulated database of top users
const topUsers = [
  {
    id: "1",
    name: "Olivia Martin",
    username: "@olivia",
    avatar: "/placeholder.svg?height=40&width=40",
    commentCount: 245,
  },
  {
    id: "2",
    name: "Jackson Lee",
    username: "@jackson",
    avatar: "/placeholder.svg?height=40&width=40",
    commentCount: 186,
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    username: "@isabella",
    avatar: "/placeholder.svg?height=40&width=40",
    commentCount: 132,
  },
  {
    id: "4",
    name: "William Kim",
    username: "@william",
    avatar: "/placeholder.svg?height=40&width=40",
    commentCount: 97,
  },
  {
    id: "5",
    name: "Sofia Davis",
    username: "@sofia",
    avatar: "/placeholder.svg?height=40&width=40",
    commentCount: 85,
  },
]

export async function GET() {
  // Sort users by comment count (highest first)
  const sortedUsers = [...topUsers].sort((a, b) => b.commentCount - a.commentCount)

  return NextResponse.json(sortedUsers)
}
