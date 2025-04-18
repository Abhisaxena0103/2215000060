import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">API Documentation</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Learn how to integrate with our Average Calculator API.
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              The Average Calculator API provides endpoints for fetching different types of numbers and calculating
              their averages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400">
              Our API exposes a REST endpoint that accepts qualified number IDs and returns the current window state
              along with the calculated average. The API maintains a configurable window size and ensures all numbers
              are unique.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endpoints</CardTitle>
            <CardDescription>Available API endpoints and their usage.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="get" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="get">GET /numbers/{"{numberId}"}</TabsTrigger>
                <TabsTrigger value="config">Configuration</TabsTrigger>
              </TabsList>
              <TabsContent value="get" className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">GET /numbers/{"{numberId}"}</h3>
                  <p className="mb-4">
                    Fetches a number of the specified type and returns the current window state along with the
                    calculated average.
                  </p>

                  <h4 className="font-medium mt-4 mb-2">Path Parameters</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">numberId</code> - Type of
                      number to fetch:
                      <ul className="list-disc pl-5 mt-1">
                        <li>
                          <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">p</code> - Prime number
                        </li>
                        <li>
                          <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">f</code> - Fibonacci number
                        </li>
                        <li>
                          <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">e</code> - Even number
                        </li>
                        <li>
                          <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">r</code> - Random number
                        </li>
                      </ul>
                    </li>
                  </ul>

                  <h4 className="font-medium mt-4 mb-2">Response</h4>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-xs">
                    {`{
  "windowPrevState": [1, 3, 5],
  "windowCurrState": [1, 3, 5, 7],
  "numbers": [7],
  "avg": 4.00
}`}
                  </pre>

                  <h4 className="font-medium mt-4 mb-2">Response Fields</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">windowPrevState</code> - The
                      state of the window before the current request
                    </li>
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">windowCurrState</code> - The
                      current state of the window after adding the new number
                    </li>
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">numbers</code> - The number(s)
                      received from the third-party server
                    </li>
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">avg</code> - The calculated
                      average of the numbers in the current window
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Example Request</h4>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-xs">
                    {`curl -X GET "https://api.numericalc.com/numbers/p" -H "accept: application/json"`}
                  </pre>

                  <h4 className="font-medium mt-4 mb-2">Example Response</h4>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-xs">
                    {`{
  "windowPrevState": [2, 3, 5, 7],
  "windowCurrState": [2, 3, 5, 7, 11],
  "numbers": [11],
  "avg": 5.60
}`}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="config" className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Configuration Options</h3>
                  <p className="mb-4">The API can be configured with the following options:</p>

                  <h4 className="font-medium mt-4 mb-2">Window Size</h4>
                  <p className="mb-2">
                    The window size determines how many numbers are kept in memory for calculating the average. When the
                    window is full, the oldest number is removed when a new one is added.
                  </p>
                  <p>
                    Default window size: <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">10</code>
                  </p>

                  <h4 className="font-medium mt-4 mb-2">Response Time</h4>
                  <p className="mb-2">
                    The API is designed to respond quickly, with a target response time of less than 500 milliseconds.
                  </p>

                  <h4 className="font-medium mt-4 mb-2">Error Handling</h4>
                  <p className="mb-2">The API handles the following error cases:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Invalid number ID - Returns a 400 Bad Request</li>
                    <li>Duplicate numbers - Ignored to ensure uniqueness</li>
                    <li>
                      Third-party server errors - Returns a 503 Service Unavailable if the third-party server is
                      unavailable
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Code Examples</CardTitle>
            <CardDescription>Examples of how to use the API in different programming languages.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>
              <TabsContent value="javascript" className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">JavaScript Example</h3>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-xs">
                    {`// Using fetch API
async function fetchNumber(type) {
  try {
    const response = await fetch(\`https://api.numericalc.com/numbers/\${type}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Current window:', data.windowCurrState);
    console.log('Average:', data.avg);
    
    return data;
  } catch (error) {
    console.error('Error fetching number:', error);
  }
}

// Example usage
fetchNumber('p').then(data => {
  // Process the data
});`}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="python" className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Python Example</h3>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-xs">
                    {`import requests

def fetch_number(number_type):
    """
    Fetch a number from the API.
    
    Args:
        number_type (str): Type of number to fetch ('p', 'f', 'e', or 'r')
        
    Returns:
        dict: API response data
    """
    try:
        response = requests.get(f'https://api.numericalc.com/numbers/{number_type}')
        response.raise_for_status()  # Raise exception for HTTP errors
        
        data = response.json()
        print(f"Current window: {data['windowCurrState']}")
        print(f"Average: {data['avg']}")
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching number: {e}")
        return None

# Example usage
data = fetch_number('p')
if data:
    # Process the data
    pass`}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="curl" className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">cURL Example</h3>
                  <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-xs">
                    {`# Fetch a prime number
curl -X GET "https://api.numericalc.com/numbers/p" -H "accept: application/json"

# Fetch a Fibonacci number
curl -X GET "https://api.numericalc.com/numbers/f" -H "accept: application/json"

# Fetch an even number
curl -X GET "https://api.numericalc.com/numbers/e" -H "accept: application/json"

# Fetch a random number
curl -X GET "https://api.numericalc.com/numbers/r" -H "accept: application/json"`}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
