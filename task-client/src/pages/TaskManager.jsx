import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks"; // Import từ file tasks.js bạn vừa tạo
import "../styles/TaskManager.css";

export default function TaskManager() {
  // --- 1. STATE QUẢN LÝ DỮ LIỆU ---
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  
  // State cho form Thêm mới
  const [newTask, setNewTask] = useState({ title: "", dueDate: "" });

  // State cho form Sửa (Modal)
  const [editingTask, setEditingTask] = useState(null); // Nếu null là không sửa, có object là đang sửa

  // --- 2. CÁC HÀM TƯƠNG TÁC API ---

  // Lấy danh sách task (có lọc)
  const fetchTasks = async () => {
    setLoading(true);
    try {
      // Nếu chọn "Tất cả" thì truyền null để API lấy hết
      const statusParam = filterStatus === "Tất cả" ? null : filterStatus;
      const data = await getTasks(statusParam);
      setTasks(data);
    } catch (error) {
      alert("Lỗi tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  // Gọi API mỗi khi filter thay đổi
  useEffect(() => {
    fetchTasks();
  }, [filterStatus]);

  // Xử lý Thêm mới
  const handleAdd = async () => {
    if (!newTask.title.trim()) return alert("Vui lòng nhập tên Task!");
    
    try {
      await createTask({
        title: newTask.title,
        dueDate: newTask.dueDate || null, // Nếu rỗng thì gửi null
      });
      
      setNewTask({ title: "", dueDate: "" }); // Reset form
      fetchTasks(); // Load lại bảng
    } catch (error) {
      alert("Lỗi khi thêm task!");
    }
  };

  // Xử lý Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      alert("Lỗi khi xóa!");
    }
  };

  // Mở Modal Sửa
  const openEditModal = (task) => {
    // Format lại ngày để hiển thị đúng trong input type="date" (yyyy-MM-dd)
    let formattedDate = "";
    if (task.dueDate) {
      formattedDate = task.dueDate.split("T")[0];
    }
    
    setEditingTask({ ...task, dueDate: formattedDate });
  };

  // Lưu Sửa
  const handleSaveEdit = async () => {
    if (!editingTask.title.trim()) return alert("Tên không được để trống");
    try {
      await updateTask(editingTask.id, {
        title: editingTask.title,
        dueDate: editingTask.dueDate || null,
        status: editingTask.status
      });
      setEditingTask(null); // Đóng modal
      fetchTasks();
    } catch (error) {
      alert("Lỗi cập nhật!");
    }
  };

  // --- 3. PHẦN GIAO DIỆN (JSX) ---
  return (
    <div className="container">
      <div className="card">
        <h1>Màn hình quản lý task cá nhân</h1>

        {/* --- KHU VỰC NHẬP LIỆU --- */}
        <div className="input-group">
          <input
            className="input-title"
            type="text"
            placeholder="Nhập tên task..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button className="btn-add" onClick={handleAdd}>Add</button>
        </div>

        {/* --- KHU VỰC LỌC --- */}
        <div className="filter-group">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đang làm">Đang làm</option>
            <option value="Hoàn thành">Hoàn thành</option>
          </select>
        </div>

        {/* --- DANH SÁCH TASK --- */}
        {loading ? (
          <p style={{textAlign: 'center'}}>Đang tải...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Due-date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 && (
                <tr><td colSpan="4" style={{textAlign: 'center'}}>Chưa có task nào</td></tr>
              )}
              {tasks.map((task) => (
                <tr key={task.id}>
                  {/* Tên Task */}
                  <td style={{ fontWeight: '500' }}>{task.title}</td>
                  
                  {/* Ngày hết hạn (Xử lý nếu null) */}
                  <td>
                    {task.dueDate 
                      ? new Date(task.dueDate).toLocaleDateString("vi-VN") 
                      : "—"}
                  </td>
                  
                  {/* Trạng thái (Badge màu) */}
                  <td>
                    <span className={`badge ${task.status === "Hoàn thành" ? "badge-green" : "badge-blue"}`}>
                      {task.status}
                    </span>
                  </td>

                  {/* Nút thao tác */}
                  <td>
                    <button className="action-btn btn-edit" onClick={() => openEditModal(task)} title="Sửa">
                      ✏️
                    </button>
                    <button className="action-btn btn-delete" onClick={() => handleDelete(task.id)} title="Xóa">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- MODAL SỬA (Chỉ hiện khi editingTask != null) --- */}
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Cập nhật Task</h3>
            
            <label>Tên Task:</label>
            <input 
              type="text" 
              value={editingTask.title} 
              onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
            />

            <label>Hạn chót:</label>
            <input 
              type="date" 
              value={editingTask.dueDate || ""} 
              onChange={(e) => setEditingTask({...editingTask, dueDate: e.target.value})}
            />

            <label>Trạng thái:</label>
            <select 
              value={editingTask.status} 
              onChange={(e) => setEditingTask({...editingTask, status: e.target.value})}
            >
              <option value="Đang làm">Đang làm</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setEditingTask(null)}>Hủy</button>
              <button className="btn-save" onClick={handleSaveEdit}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}