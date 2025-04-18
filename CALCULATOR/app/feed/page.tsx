import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Feed from "@/components/feed"

export default function FeedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feed</h1>
        <p className="text-muted-foreground">Real-time feed of the latest posts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Latest Posts</CardTitle>
          <CardDescription>A dynamic feed of the newest posts, updated in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <Feed />
        </CardContent>
      </Card>
    </div>
  )
}
