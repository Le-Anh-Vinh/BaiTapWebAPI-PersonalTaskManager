# BaiTapWebAPI-PersonalTaskManager

# Personal Task Manager

Họ và tên: Lê Anh Vinh
MSSV: 22127458

Ứng dụng quản lý công việc cá nhân bao gồm Backend (ASP.NET Core API) và Frontend (ReactJS + Vite).

## 1. Yêu cầu cài đặt (Prerequisites)
- .NET SDK 8.0 trở lên
- Node.js (v16 trở lên)
- MySQL Server (Đang chạy)


## 2. Cấu hình Database
1. Đảm bảo MySQL Server đang chạy.
2. Mở file `TaskApi/appsettings.json`.
3. Kiểm tra chuỗi kết nối `ConnectionStrings:Default`. Cập nhật `User ID` và `Password` nếu cấu hình MySQL của bạn khác mặc định:
   ```json
   "server=localhost;port=3306;database=taskdb;user=root;password=1234"


## 3. Hướng dẫn chạy

### Bước 1: Chạy Backend (.NET API)
1.  Mở terminal tại thư mục `TaskApi`.
2.  Chạy lệnh:
    ```bash
    dotnet run
    ```
3.  Server sẽ khởi động tại: `http://localhost:5233`
4.  Truy cập Swagger để test API: `http://localhost:5233/swagger`

### Bước 2: Chạy Frontend (React App)
1.  Mở một terminal mới tại thư mục `task-client`.
2.  Cài đặt các thư viện (chỉ cần làm lần đầu):
    ```bash
    npm install
    ```
3.  Khởi chạy ứng dụng:
    ```bash
    npm run dev
    ```
4.  Truy cập Web tại: `http://localhost:5173`


## 4. Thông tin thêm
  - Backend Port: 5233
  - Frontend Port: 5173
  - File cấu hình môi trường Frontend: `task-client/.env.local`
