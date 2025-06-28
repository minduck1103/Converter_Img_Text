// Thông tin về giới hạn API và cách tối ưu hóa

export const API_LIMITS = {
  // Giới hạn cho gói miễn phí Gemini API
  FREE_TIER: {
    REQUESTS_PER_MINUTE: 15,
    REQUESTS_PER_DAY: 1500,
    TOKENS_PER_MINUTE: 32000,
    TOKENS_PER_DAY: 50000
  },
  
  // Khuyến nghị sử dụng
  RECOMMENDATIONS: {
    USE_FLASH_MODEL: "Sử dụng gemini-1.5-flash thay vì gemini-1.5-pro để tiết kiệm quota",
    REDUCE_IMAGE_SIZE: "Giảm kích thước ảnh xuống dưới 1MB để giảm token consumption",
    BATCH_PROCESSING: "Xử lý nhiều ảnh trong một request thay vì gửi từng ảnh riêng lẻ",
    RETRY_STRATEGY: "Implement exponential backoff khi gặp lỗi 429"
  }
}

export const ERROR_MESSAGES = {
  QUOTA_EXCEEDED: "Đã vượt quá giới hạn quota API miễn phí. Vui lòng thử lại sau hoặc nâng cấp gói API.",
  RATE_LIMIT: "Đã vượt quá giới hạn tốc độ. Vui lòng đợi một chút trước khi thử lại.",
  INVALID_API_KEY: "API key không hợp lệ hoặc không có quyền truy cập.",
  NETWORK_ERROR: "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet và thử lại.",
  GENERAL_ERROR: "Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại sau."
}

// Hàm kiểm tra loại lỗi và trả về thông báo phù hợp
export function getErrorMessage(error: any): string {
  const errorMessage = error?.message || ""
  
  if (errorMessage.includes("429") || errorMessage.includes("quota")) {
    return ERROR_MESSAGES.QUOTA_EXCEEDED
  }
  
  if (errorMessage.includes("403")) {
    return ERROR_MESSAGES.INVALID_API_KEY
  }
  
  if (errorMessage.includes("rate limit") || errorMessage.includes("too many requests")) {
    return ERROR_MESSAGES.RATE_LIMIT
  }
  
  if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
    return ERROR_MESSAGES.NETWORK_ERROR
  }
  
  return ERROR_MESSAGES.GENERAL_ERROR
}

// Hàm tính toán thời gian delay cho retry
export function calculateRetryDelay(retryCount: number): number {
  // Exponential backoff: 5s, 10s, 20s, 40s...
  return Math.pow(2, retryCount) * 5000
}

// Hàm kiểm tra xem có nên retry hay không
export function shouldRetry(error: any, retryCount: number): boolean {
  const errorMessage = error?.message || ""
  const maxRetries = 3
  
  // Chỉ retry cho lỗi 429 (quota exceeded) và chưa vượt quá số lần retry tối đa
  return (
    retryCount < maxRetries && 
    (errorMessage.includes("429") || errorMessage.includes("quota"))
  )
} 