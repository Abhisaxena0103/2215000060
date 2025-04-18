import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator, Code, Server } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import HeroAnimation from "@/components/hero-animation"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  NumeriCalc
                </h1>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  Advanced number calculation service with specialized algorithms for prime, Fibonacci, even, and random
                  numbers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/calculator">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Try Calculator <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline">
                    View API Docs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful Number Processing</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our service provides specialized algorithms for different number types with real-time calculation and
                visualization.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Calculator className="h-10 w-10 text-blue-500" />}
              title="Multiple Number Types"
              description="Support for prime, Fibonacci, even, and random numbers with specialized algorithms."
            />
            <FeatureCard
              icon={<Server className="h-10 w-10 text-blue-500" />}
              title="Window-Based Calculation"
              description="Configure window size and get real-time average calculations as new numbers arrive."
            />
            <FeatureCard
              icon={<Code className="h-10 w-10 text-blue-500" />}
              title="RESTful API"
              description="Easy-to-use API endpoints with comprehensive documentation for seamless integration."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-800">How It Works</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple Yet Powerful</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our service fetches specialized numbers, maintains a configurable window, and calculates real-time
                averages.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 dark:border-gray-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-bold">Select Number Type</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Choose from prime, Fibonacci, even, or random numbers for your calculation.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 dark:border-gray-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-bold">Configure Window</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Set your desired window size to control how many numbers are used in the average calculation.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 dark:border-gray-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-bold">Get Results</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Receive real-time calculations with detailed information about the window state and average.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 dark:bg-blue-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Try our calculator now or explore our API documentation to integrate with your own applications.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/calculator">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Try Calculator
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                  View API Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
