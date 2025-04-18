import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TopUsers from "@/components/top-users"

export default function TopUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Top Users</h1>
        <p className="text-muted-foreground">Users with the most commented posts on the platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Users</CardTitle>
          <CardDescription>The top 5 users with the most commented posts</CardDescription>
        </CardHeader>
        <CardContent>
          <TopUsers />
        </CardContent>
      </Card>
    </div>
  )
}
