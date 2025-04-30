"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { fadeIn, scaleIn } from "@/lib/animations"

interface TextResultProps {
  text: string
}

export default function TextResult({ text }: TextResultProps) {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "extracted-text.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      animate="show"
      className="mt-8 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-blue-900">Kết quả trích xuất</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy}
            className="flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Đã sao chép</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Sao chép</span>
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span>Tải xuống</span>
          </Button>
        </div>
      </div>
      
      <motion.div
        variants={scaleIn(0.3)}
        className="rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">Văn bản</span>
        </div>
        <div className="max-h-[500px] overflow-auto p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{text}</pre>
        </div>
      </motion.div>
    </motion.div>
  )
}
