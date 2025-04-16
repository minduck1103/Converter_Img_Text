"use server"

import { extractTextWithGemini } from "@/lib/gemini-ai"

export async function extractTextFromImage(imageBase64: string) {
  console.log("Server action called with image data length:", imageBase64.length)

  try {
    // Kiểm tra xem imageBase64 có hợp lệ không
    if (!imageBase64 || !imageBase64.includes("base64")) {
      console.error("Invalid image data format")
      return {
        success: false,
        error: "Định dạng dữ liệu hình ảnh không hợp lệ",
      }
    }

    console.log("Calling Gemini API...")

    // Gọi Gemini API để trích xuất văn bản
    const result = await extractTextWithGemini(imageBase64)

    console.log("Gemini API response received:", result.success)

    return result
  } catch (error: any) {
    console.error("Error in extract-text action:", error)

    // Trả về thông báo lỗi chi tiết hơn
    let errorMessage = "Có lỗi xảy ra khi trích xuất văn bản"

    if (error.message) {
      errorMessage = `Lỗi: ${error.message}`
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}
