import { ImageIcon, FileText, Zap, Shield, Smartphone, CheckCircle } from "lucide-react"

const features = [
  {
    icon: <ImageIcon className="h-10 w-10 text-blue-600" />,
    title: "Multiple Image Formats",
    description: "Support for JPG, PNG, GIF, TIFF, BMP, and more. Upload any image type and get accurate results.",
  },
  {
    icon: <FileText className="h-10 w-10 text-blue-600" />,
    title: "Multilingual Support",
    description: "Extract text in over 100 languages with high accuracy, including non-Latin scripts.",
  },
  {
    icon: <Zap className="h-10 w-10 text-blue-600" />,
    title: "Instant Processing",
    description: "Our advanced algorithms process your images in seconds, saving you valuable time.",
  },
  {
    icon: <Shield className="h-10 w-10 text-blue-600" />,
    title: "Secure & Private",
    description: "Your images and extracted text are encrypted and automatically deleted after processing.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-blue-600" />,
    title: "Mobile Friendly",
    description: "Use our service on any device. Take a photo and extract text instantly.",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
    title: "High Accuracy",
    description: "Our AI-powered OCR delivers industry-leading accuracy, even with difficult images.",
  },
]

export default function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-900">
              Everything you need for image to text conversion
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers powerful features to make text extraction from images quick, accurate, and effortless.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-3 rounded-full bg-blue-50">{feature.icon}</div>
              <h3 className="text-xl font-bold text-blue-900">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
