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
    <div className="flex min-h-screen flex-col">
      <div className="max-w-screen-xl mx-auto w-full"> {/* Thêm ở đây */}
        <Header />
      </div>
      <main className="flex-1 max-w-screen-xl mx-auto">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Faq />
        <Newsletter />
      </main>
      <div className="max-w-screen-xl mx-auto w-full"> {/* Thêm ở đây */}
        <Footer />
      </div>
    </div>
  );
}