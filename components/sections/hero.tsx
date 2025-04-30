import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, ImageIcon, Code2, FileText, Table2, Calculator } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                AI-Powered Image Conversion
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Transform your images into various formats using advanced AI technology. From text extraction to code generation, we've got you covered.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href="/demo">
                  Try For Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50" asChild>
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>Powered by Gemini AI</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>High accuracy</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/demo?type=text" className="group">
                    <div className="flex flex-col items-center p-4 rounded-lg border-2 border-blue-100 bg-blue-50 transition-all hover:border-blue-300 hover:bg-blue-100">
                      <FileText className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                      <p className="mt-2 text-sm font-medium text-blue-700">Image to Text</p>
                    </div>
                  </Link>
                  <Link href="/demo?type=code" className="group">
                    <div className="flex flex-col items-center p-4 rounded-lg border-2 border-blue-100 bg-blue-50 transition-all hover:border-blue-300 hover:bg-blue-100">
                      <Code2 className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                      <p className="mt-2 text-sm font-medium text-blue-700">Image to Code</p>
                    </div>
                  </Link>
                  <Link href="/demo?type=table" className="group">
                    <div className="flex flex-col items-center p-4 rounded-lg border-2 border-blue-100 bg-blue-50 transition-all hover:border-blue-300 hover:bg-blue-100">
                      <Table2 className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                      <p className="mt-2 text-sm font-medium text-blue-700">Image to Table</p>
                    </div>
                  </Link>
                  <Link href="/demo?type=math" className="group">
                    <div className="flex flex-col items-center p-4 rounded-lg border-2 border-blue-100 bg-blue-50 transition-all hover:border-blue-300 hover:bg-blue-100">
                      <Calculator className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                      <p className="mt-2 text-sm font-medium text-blue-700">Image to Math</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
