import { NextResponse } from "next/server"

// Simulated database of trending posts
const trendingPosts = [
  {
    id: "1",
    title: "Introducing our new product line",
    content: "We're excited to announce our latest product line that will revolutionize the industry...",
    author: {
      name: "Marketing Team",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    commentCount: 342,
    timestamp: "2023-04-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Customer success story: How Company X increased sales by 200%",
    content: "Learn how our platform helped Company X achieve unprecedented growth in just 6 months...",
    author: {
      name: "Success Team",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    commentCount: 256,
    timestamp: "2023-04-14T14:45:00Z",
  },
  {
    id: "3",
    title: "Industry insights: The future of digital marketing",
    content: "Our experts analyze the latest trends and predict what's coming next in digital marketing...",
    author: {
      name: "Research Team",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    commentCount: 189,
    timestamp: "2023-04-13T09:15:00Z",
  },
]

export async function GET() {
  // Sort posts by comment count (highest first)
  const sortedPosts = [...trendingPosts].sort((a, b) => b.commentCount - a.commentCount)

  return NextResponse.json(sortedPosts)
}
