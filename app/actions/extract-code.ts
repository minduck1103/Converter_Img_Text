"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function extractCodeFromImage(base64Image: string) {
  try {
    // Kiểm tra API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY không được cấu hình")
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    const prompt = `Extract and identify the programming language from this image. Format the response exactly as follows:
    Language: [language name]
    Code:
    [extracted code with proper indentation]
    
    Important:
    1. Keep all original formatting, indentation, and comments
    2. Do not add any explanations or additional text
    3. If you see TypeScript/JavaScript, preserve any type annotations
    4. Include any imports or dependencies shown
    5. Maintain exact whitespace and line breaks`

    // Tách phần base64 từ data URL nếu cần
    let base64Data = base64Image
    if (base64Image.includes("base64,")) {
      base64Data = base64Image.split("base64,")[1]
    }

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      }
    ])

    const response = await result.response
    const text = response.text()

    // Kiểm tra và định dạng lại kết quả nếu cần
    if (!text.includes("Language:") || !text.includes("Code:")) {
      return {
        success: true,
        text: `Language: Unknown\nCode:\n${text}`
      }
    }

    return {
      success: true,
      text: text.trim()
    }
  } catch (error: any) {
    console.error("Error extracting code:", error)
    return {
      success: false,
      error: error.message || "Failed to extract code from image"
    }
  }
} 