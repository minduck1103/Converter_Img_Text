"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Loader2, Upload } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  isLoading: boolean
}

export default function ImageUpload({ onImageUpload, isLoading }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError(null)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      handleFile(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setError(null)

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      setError("Vui lòng chọn một tệp hình ảnh")
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Kích thước tệp không được vượt quá 10MB")
      return
    }

    console.log("Processing file:", file.name, file.type, file.size)

    // Create preview
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        if (e.target?.result) {
          const result = e.target.result as string
          console.log("File read successfully, length:", result.length)
          setPreviewImage(result)

          // Pass file to parent component
          onImageUpload(file)
        }
      } catch (error) {
        console.error("Error in FileReader onload:", error)
        setError("Có lỗi khi đọc tệp hình ảnh")
      }
    }

    reader.onerror = (e) => {
      console.error("FileReader error:", e)
      setError("Không thể đọc tệp hình ảnh")
    }

    try {
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error calling readAsDataURL:", error)
      setError("Có lỗi khi đọc tệp hình ảnh")
    }
  }

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const removeImage = () => {
    setPreviewImage(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors",
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50",
          previewImage ? "p-2" : "p-6",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isLoading}
        />

        {previewImage ? (
          <div className="relative w-full h-full">
            <Image
              src={previewImage || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-contain rounded-lg"
              unoptimized // Add this to prevent Next.js image optimization issues
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              disabled={isLoading}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3">
            <Upload className="h-12 w-12 text-blue-500" />
            <p className="text-sm text-gray-600">Kéo và thả hình ảnh vào đây hoặc</p>
            <Button type="button" onClick={handleButtonClick} disabled={isLoading}>
              Chọn tệp
            </Button>
            <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP (tối đa 10MB)</p>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        )}
      </div>

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  )
}
