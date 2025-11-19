import api from "./client"; 

// 1. Lấy danh sách Task (Có hỗ trợ lọc)
// status có thể là: null, "Tất cả", "Đang làm", "Hoàn thành"
export const getTasks = async (status = null) => { 
  const params = {};
  if (status && status !== "Tất cả") {
    params.status = status;
  }

  const res = await api.get("/Tasks", { params }); 
  return res.data; 
}; 

// 2. Lấy thông tin 1 Task theo id 
export const getTask = async (id) => { 
  const res = await api.get(`/Tasks/${id}`); 
  return res.data; 
}; 

// 3. Tạo Task mới 
export const createTask = async (payload) => { 
  // Payload chỉ cần { title: "...", dueDate: "..." }
  // Backend sẽ tự gán status = "Đang làm"
  const res = await api.post("/Tasks", payload); 
  return res.data; 
}; 

// 4. Cập nhật Task 
export const updateTask = async (id, payload) => { 
  // Payload cần đủ { title, dueDate, status }
  await api.put(`/Tasks/${id}`, payload); 
}; 

// 5. Xóa Task 
export const deleteTask = async (id) => { 
  await api.delete(`/Tasks/${id}`); 
};