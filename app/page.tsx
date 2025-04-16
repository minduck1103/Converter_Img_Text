import Header from "@/components/header"
import Hero from "@/components/sections/hero"
import Features from "@/components/sections/features"
import HowItWorks from "@/components/sections/how-it-works"
import Pricing from "@/components/sections/pricing"
import Faq from "@/components/sections/faq"
import Newsletter from "@/components/sections/newsletter"
import Footer from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
