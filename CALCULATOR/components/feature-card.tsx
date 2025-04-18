import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800">
      <div className="p-2 bg-blue-50 rounded-full dark:bg-blue-900/20">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-center text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}
