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
import { Download, RefreshCcw } from "lucide-react"
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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Kết quả trích xuất</DialogTitle>
          <DialogDescription>
            {type === "code" 
              ? "Mã nguồn đã được trích xuất từ hình ảnh của bạn" 
              : "Văn bản đã được trích xuất từ hình ảnh của bạn"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto min-h-0 my-4">
          {type === "code" ? (
            <CodeResult text={text} />
          ) : (
            <TextResult text={text} />
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Tiếp tục chuyển đổi
            </Button>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Tải xuống
            </Button>
          </div>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 