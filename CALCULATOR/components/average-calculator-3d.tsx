"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NumberSphere } from "@/components/number-sphere"
import { calculateAverage } from "@/lib/calculator"

// Types for our calculator state
interface CalculatorState {
  windowPrevState: number[]
  windowCurrState: number[]
  numbers: number[]
  avg: number
}

export default function AverageCalculator3D() {
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
      const avg = calculateAverage(windowCurrState)

      return {
        windowPrevState,
        windowCurrState,
        numbers: [...prevState.numbers, newNumber],
        avg,
      }
    })
  }

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
    <div className="w-full h-screen flex flex-col">
      <div className="absolute top-0 left-0 z-10 p-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Average Calculator</CardTitle>
            <CardDescription>A 3D visualization of the Average Calculator microservice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="window-size">Window Size</Label>
                <Input
                  id="window-size"
                  type="number"
                  min="1"
                  max="20"
                  value={windowSize}
                  onChange={(e) => setWindowSize(Number.parseInt(e.target.value) || 5)}
                />
              </div>
              <div className="space-y-2">
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
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={fetchNumber} disabled={loading}>
              {loading ? "Fetching..." : "Fetch Number"}
            </Button>
            {error && <p className="text-red-500 ml-4">{error}</p>}
          </CardFooter>
        </Card>
      </div>

      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="city" />

        {/* Display the current window of numbers as 3D spheres */}
        {calculatorState.windowCurrState.map((number, index) => (
          <NumberSphere
            key={`current-${index}`}
            number={number}
            position={[(index - (calculatorState.windowCurrState.length - 1) / 2) * 2, 0, 0]}
            color="#4f46e5"
          />
        ))}

        {/* Display the average as a larger sphere */}
        {calculatorState.windowCurrState.length > 0 && (
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <NumberSphere
              number={calculatorState.avg}
              position={[0, 3, 0]}
              color="#10b981"
              scale={1.5}
              isAverage={true}
            />
          </Float>
        )}

        {/* Display stats in 3D space */}
        <Html position={[0, -3, 0]} center>
          <div className="bg-white/90 dark:bg-gray-900/90 p-4 rounded-lg shadow-lg w-64">
            <h3 className="text-lg font-bold mb-2">Statistics</h3>
            <p>Window Size: {windowSize}</p>
            <p>Number Type: {getNumberTypeLabel(numberType)}</p>
            <p>Current Average: {calculatorState.avg.toFixed(2)}</p>
            <p>Numbers in Window: {calculatorState.windowCurrState.length}</p>
            <p>Total Numbers Fetched: {calculatorState.numbers.length}</p>
          </div>
        </Html>

        {/* Display JSON response */}
        <Html position={[8, 0, 0]} center>
          <div className="bg-white/90 dark:bg-gray-900/90 p-4 rounded-lg shadow-lg w-80 max-h-80 overflow-auto">
            <h3 className="text-lg font-bold mb-2">API Response</h3>
            <pre className="text-xs">
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
        </Html>

        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  )
}
