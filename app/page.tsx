import Header from "@/components/header";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import HowItWorks from "@/components/sections/how-it-works";
import Pricing from "@/components/sections/pricing";
import Faq from "@/components/sections/faq";
import Newsletter from "@/components/sections/newsletter";
import Footer from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-cyan-100 via-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Header />
      </div>
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ocean-hero rounded-3xl shadow-2xl mb-12 overflow-hidden">
            <Hero />
          </div>
          <div className="py-16 space-y-24">
            <div className="ocean-card rounded-3xl shadow-xl p-8 bg-white/80 backdrop-blur-md">
              <Features />
            </div>
            <div className="ocean-card rounded-3xl shadow-xl p-8 bg-white/80 backdrop-blur-md">
              <HowItWorks />
            </div>
            <div className="bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-200 rounded-3xl py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
              <Pricing />
            </div>
            <div className="ocean-card rounded-3xl shadow-xl p-8 bg-white/80 backdrop-blur-md">
              <Faq />
            </div>
            <div className="bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 rounded-3xl py-16 px-4 sm:px-6 lg:px-8 text-white shadow-2xl">
              <Newsletter />
            </div>
          </div>
        </div>
      </main>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Footer />
      </div>
    </div>
  );
}