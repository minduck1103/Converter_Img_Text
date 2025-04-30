"use client"

import { Suspense } from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, FileText, FileType, FileIcon as FilePdf, AlertCircle, Info, Code2, Table2, Calculator, Upload, Sparkles, CheckCircle2, Zap, Shield, Clock, Download } from "lucide-react"
import Link from "next/link"
import ImageUpload from "@/components/image-upload"
import TextResult from "@/components/text-result"
import CodeResult from "@/components/code-result"
import { extractTextFromImage } from "../actions/extract-text"
import { extractCodeFromImage } from "../actions/extract-code"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FadeUp, fadeIn, scaleIn, staggerContainer } from "@/lib/animations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ResultModal } from "@/components/result-modal"

export default function DemoPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DemoPage />
    </Suspense>
  );
}

function DemoPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type = searchParams.get("type") || "text"
  const [isLoading, setIsLoading] = useState(false)
  const [extractedText, setExtractedText] = useState("")
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState(type)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setActiveTab(type)
  }, [type])

  const getTitle = () => {
    switch (type) {
      case "text":
        return "Extract text from image"
      case "code":
        return "Convert image to source code"
      case "table":
        return "Convert table image to data"
      case "math":
        return "Convert math formula image"
      default:
        return "Extract text from image"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "text":
        return "Upload your image and we will extract all the text within it."
      case "code":
        return "Upload an image containing source code and we will convert it into actual source code."
      case "table":
        return "Upload a table image and we will convert it into structured data."
      case "math":
        return "Upload an image of a math formula and we will convert it into LaTeX."
      default:
        return "Upload your image and we will extract all the text within it."
    }
  }

  const getIcon = () => {
    switch (type) {
      case "text":
        return <FileText className="h-5 w-5 text-blue-600 mr-2" />
      case "code":
        return <Code2 className="h-5 w-5 text-blue-600 mr-2" />
      case "table":
        return <Table2 className="h-5 w-5 text-blue-600 mr-2" />
      case "math":
        return <Calculator className="h-5 w-5 text-blue-600 mr-2" />
      default:
        return <FileText className="h-5 w-5 text-blue-600 mr-2" />
    }
  }

  const getInfoMessage = () => {
    switch (type) {
      case "text":
        return "The system uses Google's Gemini 1.5 Pro model to extract text from images with high accuracy and speed."
      case "code":
        return "The system uses Google's Gemini 1.5 Pro model to recognize and extract source code from images, supporting various programming languages."
      case "table":
        return "The system uses Google's Gemini 1.5 Pro model to recognize table structures and convert them into structured data like CSV or JSON."
      case "math":
        return "The system uses Google's Gemini 1.5 Pro model to recognize math formulas and convert them into LaTeX format."
      default:
        return "The system uses Google's Gemini 1.5 Pro model to extract text from images with high accuracy and speed."
    }
  }

  const handleImageUpload = async (file: File) => {
    setIsLoading(true)
    setError("")
    setExtractedText("")
    setDebugInfo(null)
    setProgress(0)
    setShowResult(false)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 300)

    try {
      console.log("Processing uploaded file:", file.name, file.type, file.size)

      const reader = new FileReader()

      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string

          if (!base64) {
            throw new Error("Failed to convert image to base64")
          }

          console.log("Image converted to base64, length:", base64.length)
          setDebugInfo(`File: ${file.name}, Size: ${(file.size / 1024).toFixed(2)} KB, Type: ${file.type}`)

          let result
          if (type === "code") {
            result = await extractCodeFromImage(base64)
          } else {
            result = await extractTextFromImage(base64)
          }

          if (result.success) {
            setExtractedText(result.text || "")
            setProgress(100)
            setShowResult(true)
          } else {
            setError(result.error || "An error occurred while extracting text")
          }
        } catch (err: any) {
          console.error("Error processing image:", err)
          setError(`Error processing image: ${err.message}`)
        } finally {
          clearInterval(progressInterval)
          setIsLoading(false)
        }
      }

      reader.onerror = (err) => {
        console.error("FileReader error:", err)
        setError("Could not read image file")
        clearInterval(progressInterval)
        setIsLoading(false)
      }

      reader.readAsDataURL(file)
    } catch (err: any) {
      console.error("Unexpected error:", err)
      setError(`Unexpected error: ${err.message}`)
      clearInterval(progressInterval)
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setExtractedText("")
    setError("")
    setDebugInfo(null)
    setProgress(0)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.replace(`/demo?type=${value}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto w-full">
        <Header />
      </div>
      <main className="flex-1 max-w-6xl mx-auto py-8 px-4 md:py-12 pt-20">
        <motion.div
          className="space-y-8"
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="mb-6 flex justify-start"
            variants={fadeIn('left', 0.1)}
          >
            <Link href="/" legacyBehavior>
              <a
                className="group relative inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-cyan-400 transition-all duration-300 border-2 border-white/30 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-200"
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
              >
                <span className="absolute left-0 top-0 w-full h-full rounded-full opacity-0 group-hover:opacity-20 group-hover:bg-white transition-all duration-300"></span>
                <ArrowLeft className="mr-2 h-5 w-5 text-white drop-shadow-lg" />
                <span className="drop-shadow-lg">Back to homepage</span>
              </a>
            </Link>
          </motion.div>

          <motion.div variants={fadeIn('up', 0.2)} className="text-center">
            <h1 className="text-4xl font-normal text-blue-900 mb-4 font-sans" style={{fontFamily: 'Inter, Roboto, Arial, sans-serif'}}>{getTitle()}</h1>
            <p className="text-xl text-blue-900/80 max-w-3xl mx-auto font-medium drop-shadow-sm">
              {getDescription()}
            </p>
          </motion.div>

          <motion.div variants={scaleIn(0.3)} className="max-w-3xl mx-auto ocean-card p-1 rounded-3xl bg-gradient-to-br from-cyan-200/60 via-blue-100/60 to-indigo-100/60 shadow-2xl">
            <div className="bg-white/80 rounded-3xl p-6 backdrop-blur-md">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8 bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 rounded-full shadow-inner">
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Text</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code2 className="h-4 w-4" />
                    <span>Code</span>
                  </TabsTrigger>
                  <TabsTrigger value="table" className="flex items-center gap-2">
                    <Table2 className="h-4 w-4" />
                    <span>Table</span>
                  </TabsTrigger>
                  <TabsTrigger value="math" className="flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    <span>Math</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="mt-0">
                  <Card className="border-cyan-200/60 shadow-lg rounded-2xl">
                    <CardHeader className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 border-b border-cyan-100/60 rounded-t-2xl">
                      <CardTitle className="flex items-center text-blue-800">
                        {getIcon()}
                        {getTitle()}
                      </CardTitle>
                      <CardDescription className="text-blue-600">
                        {getDescription()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />
                      {isLoading && (
                        <div className="mt-6 space-y-2">
                          <div className="flex justify-between text-sm text-cyan-700">
                            <span>Processing image...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2 bg-cyan-100" />
                        </div>
                      )}
                      {error && (
                        <Alert variant="destructive" className="mt-6">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      {debugInfo && (
                        <div className="text-xs text-blue-500 mt-4 p-2 bg-blue-50/60 rounded">
                          {debugInfo}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 border-t border-cyan-100/60 rounded-b-2xl">
                      <div className="flex items-center text-sm text-blue-700">
                        <Info className="h-4 w-4 mr-2" />
                        <span>{getInfoMessage()}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-6 mt-12"
            variants={staggerContainer(0.1, 0.8)}
          >
            <motion.div
              className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
              variants={fadeIn('up', 0.1)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-blue-800 mb-2 text-center">Fast Speed</h3>
              <p className="text-sm text-gray-600 text-center">
                Extract text from images in seconds with high accuracy.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
              variants={fadeIn('up', 0.2)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-blue-800 mb-2 text-center">Advanced AI</h3>
              <p className="text-sm text-gray-600 text-center">
                Uses Google's Gemini 1.5 Pro model to recognize and extract text.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
              variants={fadeIn('up', 0.3)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-blue-800 mb-2 text-center">Secure</h3>
              <p className="text-sm text-gray-600 text-center">
                Your data is processed securely and is not stored after extraction.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
              variants={fadeIn('up', 0.4)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-blue-800 mb-2 text-center">Time Saving</h3>
              <p className="text-sm text-gray-600 text-center">
                Automates the text extraction process, saving you time and effort.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm mt-8"
            variants={fadeIn('up', 0.9)}
          >
            <h3 className="font-medium text-blue-800 mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              Important Notes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-sm text-gray-600 ml-2">Extraction quality depends on the clarity of the image</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-sm text-gray-600 ml-2">Supports various languages</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-sm text-gray-600 ml-2">Best results with printed text, may be less accurate with handwriting</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-sm text-gray-600 ml-2">You can download the results in various formats after extraction</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <div className="max-w-6xl mx-auto w-full">
        <Footer />
      </div>

      <ResultModal
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        onReset={handleReset}
        type={type}
        text={extractedText}
      />
    </div>
  );
}