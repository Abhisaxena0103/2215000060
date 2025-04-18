"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  commentCount: number
  timestamp: string
}

export default function TrendingPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // For demo purposes, we're simulating the API response
        const response = await fetch("http://localhost:3000/api/trending-posts")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Failed to fetch trending posts:", error)
        // Fallback data for demonstration
        setPosts([
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
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingPosts()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{post.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{post.commentCount}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
