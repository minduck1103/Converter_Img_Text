"use server"

import OpenAI from "openai"

// Khởi tạo OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

    // Tách phần base64 từ data URL
    const base64Data = imageBase64.split(",")[1]

    if (!base64Data) {
      console.error("Could not extract base64 data from image")
      return {
        success: false,
        error: "Không thể xử lý dữ liệu hình ảnh",
      }
    }

    console.log("Extracted base64 data, length:", base64Data.length)
    console.log("Calling OpenAI API with model gpt-4o...")

    // Gọi OpenAI API với mô hình gpt-4o thay vì gpt-4-vision-preview
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Cập nhật mô hình từ gpt-4-vision-preview sang gpt-4o
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all text from this image. Return only the extracted text without any additional comments.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Data}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    })

    console.log("OpenAI API response received")

    if (!response.choices || response.choices.length === 0) {
      console.error("Empty response from OpenAI API")
      return {
        success: false,
        error: "Không nhận được phản hồi từ API",
      }
    }

    return {
      success: true,
      text: response.choices[0].message.content,
    }
  } catch (error: any) {
    console.error("Error extracting text:", error)

    // Trả về thông báo lỗi chi tiết hơn
    let errorMessage = "Có lỗi xảy ra khi trích xuất văn bản"

    if (error.response) {
      console.error("OpenAI API error response:", error.response.data)
      errorMessage = `Lỗi API: ${error.response.data?.error?.message || error.message}`
    } else if (error.message) {
      errorMessage = `Lỗi: ${error.message}`
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}
