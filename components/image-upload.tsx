"use client"

import { useState, useEffect } from "react"
import { Upload, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { fadeIn, scaleIn } from "@/lib/animations"

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  isLoading: boolean
}

export default function ImageUpload({ onImageUpload, isLoading }: ImageUploadProps) {
  const [mounted, setMounted] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0])
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <motion.div
        variants={scaleIn(0.3)}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          {isLoading ? (
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          ) : (
            <Upload className="h-8 w-8 text-blue-500" />
          )}
          <p className="text-sm text-gray-600">
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                Drag and drop an image here, or{" "}
                <span className="text-blue-500 font-medium">browse files</span>
              </>
            )}
          </p>
          <p className="text-xs text-gray-500">
            Supported: JPG, PNG, GIF (Max 10MB)
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}