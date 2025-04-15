"use client"

import { useState } from "react"
import { ArrowLeft, FileText, FileType, FileIcon as FilePdf, AlertCircle, Info } from "lucide-react"
import Link from "next/link"
import ImageUpload from "@/components/image-upload"
import TextResult from "@/components/text-result"
import { extractTextFromImage } from "../actions/extract-text"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState<string | null>(null)

  const handleImageUpload = async (file: File) => {
    setIsLoading(true)
    setError("")
    setExtractedText("")
    setDebugInfo(null)

    try {
      console.log("Processing uploaded file:", file.name, file.type, file.size)

      // Convert file to base64
      const reader = new FileReader()

      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string

          if (!base64) {
            throw new Error("Failed to convert image to base64")
          }

          console.log("Image converted to base64, length:", base64.length)
          setDebugInfo(`File: ${file.name}, Size: ${(file.size / 1024).toFixed(2)} KB, Type: ${file.type}`)

          // Call the server action
          const result = await extractTextFromImage(base64)

          if (result.success) {
            setExtractedText(result.text || "")
          } else {
            setError(result.error || "Có lỗi xảy ra khi trích xuất văn bản")
          }
        } catch (err: any) {
          console.error("Error processing image:", err)
          setError(`Lỗi xử lý hình ảnh: ${err.message}`)
        } finally {
          setIsLoading(false)
        }
      }

      reader.onerror = (err) => {
        console.error("FileReader error:", err)
        setError("Không thể đọc tệp hình ảnh")
        setIsLoading(false)
      }

      reader.readAsDataURL(file)
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(`Lỗi không mong đợi: ${err.message}`)
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8 px-4 md:py-12">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại trang chủ
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Trích xuất văn bản từ hình ảnh</h1>
          <p className="mt-2 text-gray-600">
            Tải lên hình ảnh của bạn và chúng tôi sẽ trích xuất tất cả văn bản có trong đó.
          </p>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-700">Thông tin</AlertTitle>
          <AlertDescription className="text-blue-600">
            Hệ thống sử dụng mô hình GPT-4o của OpenAI để trích xuất văn bản từ hình ảnh với độ chính xác cao.
          </AlertDescription>
        </Alert>

        <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {debugInfo && <div className="text-xs text-gray-500 mt-2">{debugInfo}</div>}

        {extractedText && !isLoading && <TextResult text={extractedText} />}

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-800">TXT Format</h3>
            </div>
            <p className="text-sm text-blue-700">
              Định dạng văn bản đơn giản, dễ dàng chia sẻ và tương thích với hầu hết các ứng dụng.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <FileType className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-800">DOC Format</h3>
            </div>
            <p className="text-sm text-blue-700">
              Định dạng Microsoft Word, phù hợp để chỉnh sửa và định dạng văn bản sau khi trích xuất.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <FilePdf className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-800">PDF Format</h3>
            </div>
            <p className="text-sm text-blue-700">
              Định dạng phổ biến cho tài liệu, giữ nguyên định dạng trên mọi thiết bị và dễ dàng chia sẻ.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Lưu ý:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
            <li>Chất lượng trích xuất phụ thuộc vào độ rõ nét của hình ảnh</li>
            <li>Hỗ trợ nhiều ngôn ngữ khác nhau</li>
            <li>Kết quả tốt nhất với văn bản in, có thể kém chính xác hơn với chữ viết tay</li>
            <li>Bạn có thể tải xuống kết quả dưới dạng TXT, DOC hoặc PDF sau khi trích xuất</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
