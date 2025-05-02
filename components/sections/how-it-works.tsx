const steps = [
  {
    step: "01",
    title: "Upload Your Image",
    description: "Drag and drop your image or select from your device. We support all common image formats.",
  },
  {
    step: "02",
    title: "Process with AI",
    description: "Our advanced AI technology analyzes your image and extracts all text with high accuracy.",
  },
  {
    step: "03",
    title: "Get Your Text",
    description: "View, edit, and download the extracted text in various formats including TXT, DOC, and PDF.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Process</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-900">How It Works</h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Converting images to text has never been easier. Follow these simple steps.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center space-y-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-blue-900">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
              {i < 2 && (
                <div className="hidden md:block absolute top-7 left-[calc(100%_-_105px)] w-[calc(100%_-_100px)] h-0.5 bg-blue-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
