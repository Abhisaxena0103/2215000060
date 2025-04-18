"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MessageSquare, ThumbsUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"

interface Post {
  id: string
  content: string
  author: {
    id: string
    name: string
    username: string
    avatar: string
  }
  likes: number
  comments: number
  timestamp: string
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // For demo purposes, we're simulating the API response
        const response = await fetch("http://localhost:3000/api/feed")
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error("Failed to fetch feed:", error)
        // Fallback data for demonstration
        setPosts([
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
            content:
              "Excited to announce that we'll be attending the Tech Conference next month. Come say hi at booth #42!",
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
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchFeed()

    // Set up polling for real-time updates
    const interval = setInterval(fetchFeed, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
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
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {post.author.username} • {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm">{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{post.comments}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
