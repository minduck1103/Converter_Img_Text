import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">ImageToText</span>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Pricing
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-blue-600 transition-colors">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="https://nextjs.org/docs" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Docs
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Link href="/demo">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
