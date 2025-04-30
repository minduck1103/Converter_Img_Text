"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download, RefreshCcw, X } from "lucide-react"
import CodeResult from "./code-result"
import TextResult from "./text-result"

interface ResultModalProps {
  isOpen: boolean
  onClose: () => void
  onReset: () => void
  type: string
  text: string
}

export function ResultModal({
  isOpen,
  onClose,
  onReset,
  type,
  text
}: ResultModalProps) {
  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    
    // Xác định phần mở rộng file dựa trên loại
    let extension = "txt"
    if (type === "code") {
      const languageMatch = text.match(/Language:\s*([^\n]+)/i)
      if (languageMatch) {
        const language = languageMatch[1].trim().toLowerCase()
        switch (language) {
          case "typescript":
          case "ts":
            extension = "ts"
            break
          case "javascript":
          case "js":
            extension = "js"
            break
          case "python":
          case "py":
            extension = "py"
            break
          case "java":
            extension = "java"
            break
          default:
            extension = "txt"
        }
      }
    }
    
    element.download = `extracted-${type}.${extension}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleReset = () => {
    onReset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col p-0 bg-gradient-to-br from-cyan-100/80 via-blue-100/80 to-indigo-100/80 border-0 shadow-2xl rounded-3xl ocean-modal">
        <div className="relative w-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/70 hover:bg-cyan-100 text-blue-900 rounded-full p-2 shadow transition-all"
            aria-label="Close"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <DialogHeader className="px-8 pt-8 pb-2">
          <DialogTitle className="text-2xl font-bold text-blue-900 mb-1">Extraction Result</DialogTitle>
          <DialogDescription className="text-blue-700/80 text-base">
            {type === "code" 
              ? "The source code has been extracted from your image." 
              : "The text has been extracted from your image."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-auto min-h-0 my-4 px-8">
          <div className="rounded-2xl bg-white/80 shadow-inner p-4 border border-cyan-100">
            {type === "code" ? (
              <CodeResult text={text} />
            ) : (
              <TextResult text={text} />
            )}
          </div>
        </div>
        <DialogFooter className="flex flex-col md:flex-row justify-between items-center gap-4 px-8 pb-8 pt-2 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 rounded-b-3xl border-t border-cyan-100/60">
          <div className="flex gap-2 w-full md:w-auto justify-center">
            <Button variant="outline" onClick={handleReset} className="bg-white/80 hover:bg-cyan-100 text-blue-900 border-cyan-200 font-semibold rounded-full shadow">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Continue
            </Button>
            <Button onClick={handleDownload} className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-blue-600 hover:to-cyan-400 text-white font-bold rounded-full shadow px-6">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 