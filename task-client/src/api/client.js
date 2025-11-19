import axios from "axios"; 
 
// Tạo instance axios với cấu hình sẵn 
const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_BASE_URL, // URL lấy từ .env.local 
  timeout: 10000, // Giới hạn thời gian chờ (10s) 
}); 
 
// Có thể thêm interceptor để log lỗi, xử lý token... 
api.interceptors.response.use( 
  (res) => res, 
  (err) => { 
    console.error("API Error:", err); 
    return Promise.reject(err); 
  } 
); 
 
export default api; // Export để các file khác dùng