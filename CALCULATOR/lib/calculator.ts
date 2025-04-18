/**
 * Calculate the average of an array of numbers
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0

  const sum = numbers.reduce((acc, num) => acc + num, 0)
  return sum / numbers.length
}

/**
 * Check if a number is prime
 */
export function isPrime(num: number): boolean {
  if (num <= 1) return false
  if (num <= 3) return true

  if (num % 2 === 0 || num % 3 === 0) return false

  let i = 5
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false
    i += 6
  }

  return true
}

/**
 * Check if a number is in the Fibonacci sequence
 * A number is Fibonacci if 5*n^2 + 4 or 5*n^2 - 4 is a perfect square
 */
export function isFibonacci(num: number): boolean {
  const isPerfectSquare = (n: number): boolean => {
    const sqrt = Math.sqrt(n)
    return sqrt === Math.floor(sqrt)
  }

  return isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4)
}

/**
 * Check if a number is even
 */
export function isEven(num: number): boolean {
  return num % 2 === 0
}
