"use client"

import { Button } from "@/components/ui/button"
import { Copy, Download, FileText, FileType, FileIcon as FilePdf } from "lucide-react"
import { useState } from "react"
import { downloadAsText, downloadAsDoc, downloadAsPdf } from "@/lib/file-utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TextResultProps {
  text: string
}

export default function TextResult({ text }: TextResultProps) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = async (format: "txt" | "doc" | "pdf") => {
    try {
      setIsDownloading(format)

      switch (format) {
        case "txt":
          downloadAsText(text)
          break
        case "doc":
          await downloadAsDoc(text)
          break
        case "pdf":
          downloadAsPdf(text)
          break
      }
    } catch (error) {
      console.error(`Error downloading as ${format}:`, error)
    } finally {
      setIsDownloading(null)
    }
  }

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-3 flex justify-between items-center border-b">
        <h3 className="font-medium">Kết quả trích xuất</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 gap-1">
            <Copy className="h-4 w-4" />
            {copied ? "Đã sao chép" : "Sao chép"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-4 w-4" />
                Tải xuống
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleDownload("txt")}
                disabled={isDownloading !== null}
                className="cursor-pointer"
              >
                <FileText className="h-4 w-4 mr-2" />
                <span>Tải xuống dạng TXT</span>
                {isDownloading === "txt" && <span className="ml-2 animate-pulse">...</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDownload("doc")}
                disabled={isDownloading !== null}
                className="cursor-pointer"
              >
                <FileType className="h-4 w-4 mr-2" />
                <span>Tải xuống dạng DOC</span>
                {isDownloading === "doc" && <span className="ml-2 animate-pulse">...</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDownload("pdf")}
                disabled={isDownloading !== null}
                className="cursor-pointer"
              >
                <FilePdf className="h-4 w-4 mr-2" />
                <span>Tải xuống dạng PDF</span>
                {isDownloading === "pdf" && <span className="ml-2 animate-pulse">...</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4 max-h-96 overflow-y-auto whitespace-pre-wrap">
        {text || "Không có văn bản nào được trích xuất."}
      </div>
    </div>
  )
}
