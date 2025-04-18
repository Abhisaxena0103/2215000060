import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopUsers from "@/components/top-users"
import TrendingPosts from "@/components/trending-posts"
import Feed from "@/components/feed"

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Media Analytics Dashboard</h1>
        <p className="text-muted-foreground">Real-time analytics and insights for your social media platform</p>
      </div>

      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="trending">Trending Posts</TabsTrigger>
          <TabsTrigger value="top-users">Top Users</TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Posts</CardTitle>
              <CardDescription>Real-time feed of the newest posts from the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Feed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trending Posts</CardTitle>
              <CardDescription>Posts with the highest number of comments</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendingPosts />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="top-users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Users</CardTitle>
              <CardDescription>Users with the most commented posts</CardDescription>
            </CardHeader>
            <CardContent>
              <TopUsers />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
