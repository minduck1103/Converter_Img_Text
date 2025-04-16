import { GoogleGenerativeAI } from "@google/generative-ai"

// Khởi tạo Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Hàm trích xuất văn bản từ hình ảnh sử dụng Gemini
export async function extractTextWithGemini(
  imageBase64: string,
): Promise<{ success: boolean; text?: string; error?: string }> {
  try {
    // Kiểm tra API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY không được cấu hình")
    }

    // Tách phần base64 từ data URL nếu cần
    let base64Data = imageBase64
    if (imageBase64.includes("base64,")) {
      base64Data = imageBase64.split("base64,")[1]
    }

    // Khởi tạo model Gemini 1.5 Flash (thay thế cho gemini-pro-vision đã bị loại bỏ)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    // Chuẩn bị nội dung cho prompt
    const prompt = "Extract all text from this image. Return only the extracted text without any additional comments."

    // Tạo đối tượng FileObject từ base64
    const imageData = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg", // Giả định là JPEG, có thể cần điều chỉnh dựa trên loại hình ảnh thực tế
      },
    }

    // Gọi API để tạo nội dung
    const result = await model.generateContent([prompt, imageData])
    const response = await result.response
    const text = response.text()

    return {
      success: true,
      text,
    }
  } catch (error: any) {
    console.error("Error extracting text with Gemini:", error)

    let errorMessage = "Có lỗi xảy ra khi trích xuất văn bản"
    if (error.message) {
      errorMessage = `Lỗi Gemini API: ${error.message}`
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}
