"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowRight, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface CalculatorState {
  windowPrevState: number[]
  windowCurrState: number[]
  numbers: number[]
  avg: number
}

export default function CalculatorPage() {
  const [windowSize, setWindowSize] = useState<number>(5)
  const [numberType, setNumberType] = useState<string>("e")
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    windowPrevState: [],
    windowCurrState: [],
    numbers: [],
    avg: 0,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [chartData, setChartData] = useState<any[]>([])

  // Function to fetch a new number
  const fetchNumber = async () => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API call to a third-party server
      // In a real app, this would be a fetch to your actual API
      const response = await simulateApiCall(numberType)

      // Process the new number
      processNewNumber(response)
    } catch (err) {
      setError("Failed to fetch number. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Simulate API call (in a real app, this would be a fetch to your actual API)
  const simulateApiCall = async (type: string): Promise<number> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Generate a number based on the selected type
    switch (type) {
      case "p": // Prime
        return generatePrime()
      case "f": // Fibonacci
        return generateFibonacci()
      case "e": // Even
        return generateEven()
      case "r": // Random
        return generateRandom()
      default:
        return generateRandom()
    }
  }

  // Process a new number
  const processNewNumber = (newNumber: number) => {
    setCalculatorState((prevState) => {
      // Create a copy of the current state
      const windowPrevState = [...prevState.windowCurrState]

      // Add the new number to the current state
      let windowCurrState = [...prevState.windowCurrState, newNumber]

      // If we exceed the window size, remove the oldest number
      if (windowCurrState.length > windowSize) {
        windowCurrState = windowCurrState.slice(1)
      }

      // Calculate the new average
      const avg = windowCurrState.reduce((sum, num) => sum + num, 0) / windowCurrState.length || 0

      return {
        windowPrevState,
        windowCurrState,
        numbers: [...prevState.numbers, newNumber],
        avg,
      }
    })
  }

  // Update chart data when calculator state changes
  useEffect(() => {
    const newChartData = calculatorState.numbers.map((number, index) => ({
      index,
      value: number,
      average:
        calculatorState.windowCurrState.reduce((sum, num) => sum + num, 0) / calculatorState.windowCurrState.length ||
        0,
    }))
    setChartData(newChartData)
  }, [calculatorState])

  // Generate a prime number (simplified for demo)
  const generatePrime = (): number => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
    return primes[Math.floor(Math.random() * primes.length)]
  }

  // Generate a Fibonacci number (simplified for demo)
  const generateFibonacci = (): number => {
    const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
    return fibonacci[Math.floor(Math.random() * fibonacci.length)]
  }

  // Generate an even number
  const generateEven = (): number => {
    return Math.floor(Math.random() * 50) * 2
  }

  // Generate a random number
  const generateRandom = (): number => {
    return Math.floor(Math.random() * 100)
  }

  // Get number type label
  const getNumberTypeLabel = (type: string): string => {
    switch (type) {
      case "p":
        return "Prime"
      case "f":
        return "Fibonacci"
      case "e":
        return "Even"
      case "r":
        return "Random"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Interactive Calculator</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Configure your calculator, fetch numbers, and see real-time results.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calculator Configuration</CardTitle>
            <CardDescription>Set your preferences and fetch numbers to calculate averages.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="window-size">Window Size</Label>
                <Input
                  id="window-size"
                  type="number"
                  min="1"
                  max="20"
                  value={windowSize}
                  onChange={(e) => setWindowSize(Number.parseInt(e.target.value) || 5)}
                />
                <p className="text-sm text-gray-500">Number of values to keep in the calculation window.</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number-type">Number Type</Label>
                <Select value={numberType} onValueChange={setNumberType}>
                  <SelectTrigger id="number-type">
                    <SelectValue placeholder="Select number type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p">Prime</SelectItem>
                    <SelectItem value="f">Fibonacci</SelectItem>
                    <SelectItem value="e">Even</SelectItem>
                    <SelectItem value="r">Random</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Type of number to fetch for calculations.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={fetchNumber} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  Fetch Number <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Current window state and calculated average.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="visual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="visual">Visual</TabsTrigger>
                <TabsTrigger value="json">JSON</TabsTrigger>
              </TabsList>
              <TabsContent value="visual" className="space-y-4">
                <div className="flex flex-wrap gap-2 py-4">
                  {calculatorState.windowCurrState.map((number, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <span className="text-blue-700 dark:text-blue-300 font-medium">{number}</span>
                    </motion.div>
                  ))}
                  {calculatorState.windowCurrState.length === 0 && (
                    <p className="text-gray-500 italic">No numbers in window yet. Click "Fetch Number" to begin.</p>
                  )}
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Average:</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {calculatorState.avg.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Window Size:</span>
                    <span className="text-sm font-medium">
                      {calculatorState.windowCurrState.length} / {windowSize}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Number Type:</span>
                    <span className="text-sm font-medium">{getNumberTypeLabel(numberType)}</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="json">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <pre className="text-xs overflow-auto max-h-[300px]">
                    {JSON.stringify(
                      {
                        windowPrevState: calculatorState.windowPrevState,
                        windowCurrState: calculatorState.windowCurrState,
                        numbers: calculatorState.numbers.slice(-5), // Show only the last 5 numbers
                        avg: calculatorState.avg,
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Data Visualization</CardTitle>
          <CardDescription>Visual representation of numbers and their average over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="index" label={{ value: "Request Number", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Value", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Number" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="average" stroke="#10b981" name="Average" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 italic">No data to display yet. Fetch some numbers to see the chart.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
