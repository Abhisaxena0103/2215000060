import Link from "next/link"
import { Calculator } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          <p className="text-sm text-muted-foreground">© 2025 NumeriCalc. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/calculator" className="text-sm text-muted-foreground hover:text-foreground">
            Calculator
          </Link>
          <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
            API Docs
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
