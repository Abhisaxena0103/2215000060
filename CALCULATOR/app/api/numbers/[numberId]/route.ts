import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for our calculator
const windowState: number[] = []
const windowSize = 10 // Default window size
const uniqueNumbers = new Set<number>()

export async function GET(request: NextRequest, { params }: { params: { numberId: string } }) {
  const numberId = params.numberId

  // Validate the number ID
  if (!["p", "f", "e", "r"].includes(numberId)) {
    return NextResponse.json(
      { error: "Invalid number ID. Use 'p' for prime, 'f' for Fibonacci, 'e' for even, and 'r' for random." },
      { status: 400 },
    )
  }

  try {
    // Store the previous state
    const windowPrevState = [...windowState]

    // Fetch a number from a third-party server (simulated)
    const newNumber = await fetchNumberFromThirdParty(numberId)

    // Ensure the number is unique
    if (uniqueNumbers.has(newNumber)) {
      // If duplicate, try to get another number
      return NextResponse.json({ error: "Duplicate number encountered. Please try again." }, { status: 409 })
    }

    // Add the number to our unique set
    uniqueNumbers.add(newNumber)

    // Update the window state
    windowState.push(newNumber)

    // If we exceed the window size, remove the oldest number
    if (windowState.length > windowSize) {
      windowState.shift()
    }

    // Calculate the average
    const avg = windowState.reduce((sum, num) => sum + num, 0) / windowState.length

    // Return the response
    return NextResponse.json({
      windowPrevState,
      windowCurrState: windowState,
      numbers: [newNumber], // The number received from the third-party server
      avg,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process request. Please try again." }, { status: 500 })
  }
}

// Simulate fetching a number from a third-party server
async function fetchNumberFromThirdParty(numberId: string): Promise<number> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Generate a number based on the requested type
  let number: number

  switch (numberId) {
    case "p": // Prime
      number = generatePrimeNumber()
      break
    case "f": // Fibonacci
      number = generateFibonacciNumber()
      break
    case "e": // Even
      number = generateEvenNumber()
      break
    case "r": // Random
      number = generateRandomNumber()
      break
    default:
      number = generateRandomNumber()
  }

  return number
}

// Generate a prime number
function generatePrimeNumber(): number {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
  return primes[Math.floor(Math.random() * primes.length)]
}

// Generate a Fibonacci number
function generateFibonacciNumber(): number {
  const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
  return fibonacci[Math.floor(Math.random() * fibonacci.length)]
}

// Generate an even number
function generateEvenNumber(): number {
  return Math.floor(Math.random() * 50) * 2
}

// Generate a random number
function generateRandomNumber(): number {
  return Math.floor(Math.random() * 100)
}
