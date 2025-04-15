import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-900">
                Convert Images to Text with Converter
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Our advanced AI technology extracts text from images with high accuracy. Save time and increase
                productivity.
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
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <span>Free tier available</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-center border-2 border-dashed border-blue-200 rounded-lg p-8 bg-blue-50">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-blue-400" />
                    <p className="mt-2 text-sm text-gray-500">Drag & drop your image here</p>
                  </div>
                </div>
                <div className="h-4 w-full rounded-full bg-gray-100"></div>
                <div className="h-4 w-3/4 rounded-full bg-gray-100"></div>
                <div className="h-4 w-5/6 rounded-full bg-gray-100"></div>
                <div className="h-4 w-2/3 rounded-full bg-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
