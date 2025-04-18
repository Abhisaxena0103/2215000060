import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TrendingPosts from "@/components/trending-posts"

export default function TrendingPostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trending Posts</h1>
        <p className="text-muted-foreground">Posts with the highest engagement on the platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trending Posts</CardTitle>
          <CardDescription>Posts with the maximum number of comments</CardDescription>
        </CardHeader>
        <CardContent>
          <TrendingPosts />
        </CardContent>
      </Card>
    </div>
  )
}
