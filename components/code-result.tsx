"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { motion } from "framer-motion"
import { fadeIn, scaleIn } from "@/lib/animations"
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx"
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript"
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript"
import python from "react-syntax-highlighter/dist/esm/languages/prism/python"
import java from "react-syntax-highlighter/dist/esm/languages/prism/java"
import cpp from "react-syntax-highlighter/dist/esm/languages/prism/cpp"
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp"
import php from "react-syntax-highlighter/dist/esm/languages/prism/php"
import ruby from "react-syntax-highlighter/dist/esm/languages/prism/ruby"
import go from "react-syntax-highlighter/dist/esm/languages/prism/go"
import rust from "react-syntax-highlighter/dist/esm/languages/prism/rust"
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql"
import json from "react-syntax-highlighter/dist/esm/languages/prism/json"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash"
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml"
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown"
import html from "react-syntax-highlighter/dist/esm/languages/prism/markup"
import css from "react-syntax-highlighter/dist/esm/languages/prism/css"

// Register languages
SyntaxHighlighter.registerLanguage("jsx", jsx)
SyntaxHighlighter.registerLanguage("typescript", typescript)
SyntaxHighlighter.registerLanguage("javascript", javascript)
SyntaxHighlighter.registerLanguage("python", python)
SyntaxHighlighter.registerLanguage("java", java)
SyntaxHighlighter.registerLanguage("cpp", cpp)
SyntaxHighlighter.registerLanguage("csharp", csharp)
SyntaxHighlighter.registerLanguage("php", php)
SyntaxHighlighter.registerLanguage("ruby", ruby)
SyntaxHighlighter.registerLanguage("go", go)
SyntaxHighlighter.registerLanguage("rust", rust)
SyntaxHighlighter.registerLanguage("sql", sql)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("bash", bash)
SyntaxHighlighter.registerLanguage("yaml", yaml)
SyntaxHighlighter.registerLanguage("markdown", markdown)
SyntaxHighlighter.registerLanguage("html", html)
SyntaxHighlighter.registerLanguage("css", css)

interface CodeResultProps {
  text: string
}

export default function CodeResult({ text }: CodeResultProps) {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Extract language and code from the result
  const languageMatch = text.match(/Language:\s*([^\n]+)/i)
  const codeMatch = text.match(/Code:\s*([\s\S]+)/i)
  
  const language = languageMatch ? languageMatch[1].trim().toLowerCase() : "plaintext"
  const code = codeMatch ? codeMatch[1].trim() : text

  console.log("Language detected:", language)
  console.log("Code content:", code)
  
  // Map common language names to supported languages
  const getLanguage = (lang: string) => {
    const languageMap: Record<string, string> = {
      "js": "javascript",
      "jsx": "jsx",
      "ts": "typescript",
      "tsx": "typescript",
      "typescript": "typescript",
      "javascript": "javascript",
      "py": "python",
      "python": "python",
      "java": "java",
      "cpp": "cpp",
      "c++": "cpp",
      "c#": "csharp",
      "csharp": "csharp",
      "php": "php",
      "rb": "ruby",
      "ruby": "ruby",
      "go": "go",
      "golang": "go",
      "rs": "rust",
      "rust": "rust",
      "sql": "sql",
      "json": "json",
      "sh": "bash",
      "bash": "bash",
      "shell": "bash",
      "yml": "yaml",
      "yaml": "yaml",
      "md": "markdown",
      "markdown": "markdown",
      "html": "html",
      "htm": "html",
      "css": "css",
      "plaintext": "plaintext"
    }
    
    return languageMap[lang] || "plaintext"
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([code], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `code.${language === "plaintext" ? "txt" : language}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!mounted) {
    return null
  }

  if (!code) {
    return (
      <div className="p-4 text-center text-gray-500">
        Không tìm thấy mã nguồn trong kết quả
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
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
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            {language !== "plaintext" ? `Ngôn ngữ: ${language}` : "Văn bản"}
          </span>
        </div>
        <div className="max-h-[500px] overflow-auto">
          <SyntaxHighlighter 
            language={getLanguage(language)} 
            style={vscDarkPlus}
            customStyle={{ margin: 0, borderRadius: 0 }}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </motion.div>
    </div>
  )
} 