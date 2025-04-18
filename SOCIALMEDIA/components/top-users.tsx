"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface User {
  id: string
  name: string
  username: string
  avatar: string
  commentCount: number
}

export default function TopUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // For demo purposes, we're simulating the API response
        const response = await fetch("http://localhost:3000/api/top-users")
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error("Failed to fetch top users:", error)
        // Fallback data for demonstration
        setUsers([
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
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTopUsers()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.username}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold">{user.commentCount}</span>
                <span className="text-sm text-muted-foreground">comments</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
