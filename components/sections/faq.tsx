import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What types of images can I convert?",
    answer:
      "Our service supports all common image formats including JPG, PNG, GIF, TIFF, BMP, and more. You can upload scanned documents, photos of text, screenshots, and other images containing text.",
  },
  {
    question: "How accurate is the text extraction?",
    answer:
      "Our AI-powered OCR technology delivers industry-leading accuracy. For clear images with standard fonts, you can expect 98%+ accuracy. For more challenging images with handwriting or unusual fonts, accuracy may vary but still remains high compared to industry standards.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security very seriously. All uploads are encrypted using TLS/SSL. Your images and extracted text are automatically deleted from our servers after processing unless you choose to save them in your account. We never share your data with third parties.",
  },
  {
    question: "Can I convert images in bulk?",
    answer:
      "Yes, our Pro and Business plans support batch processing, allowing you to convert multiple images at once. This feature saves time and increases productivity for users who need to process many images regularly.",
  },
  {
    question: "What languages are supported?",
    answer:
      "Our service supports text extraction in over 100 languages, including English, Spanish, French, German, Chinese, Japanese, Arabic, Russian, and many more. Our multilingual OCR can even detect and extract text from images containing multiple languages.",
  },
]

export default function Faq() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-blue-900">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our image to text conversion service.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl space-y-4 mt-12">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between p-6">
                  <h3 className="text-lg font-medium text-blue-900">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
