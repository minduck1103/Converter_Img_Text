import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for occasional use",
    features: [
      "10 images per month",
      "Basic OCR accuracy",
      "Standard processing speed",
      "TXT export only",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    description: "Ideal for regular users",
    features: [
      "100 images per month",
      "Enhanced OCR accuracy",
      "Priority processing",
      "TXT, DOC, PDF exports",
      "Priority support",
      "Batch processing",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "$29.99",
    period: "/month",
    description: "For teams and businesses",
    features: [
      "Unlimited images",
      "Highest OCR accuracy",
      "Fastest processing",
      "All export formats",
      "24/7 priority support",
      "API access",
      "Team management",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-900">
              Simple, transparent pricing
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for you. All plans include a 7-day free trial.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`flex flex-col rounded-lg border ${plan.popular ? "border-blue-600 shadow-lg" : "border-gray-200 shadow-sm"} bg-white p-6`}
            >
              {plan.popular && (
                <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 mb-4 self-start">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-blue-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && <span className="ml-1 text-gray-600">{plan.period}</span>}
              </div>
              <p className="mt-2 text-gray-600">{plan.description}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`mt-8 ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"}`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
