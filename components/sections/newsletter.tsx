import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t border-gray-200">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-900">
                Stay updated with our newsletter
              </h2>
              <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get the latest news, tips, and updates about our image to text conversion service.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <form className="flex flex-col gap-2 sm:flex-row">
              <Input type="email" placeholder="Enter your email" className="flex-1" required />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
