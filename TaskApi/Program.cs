using Microsoft.EntityFrameworkCore;
using TaskApi.Data; 
using TaskApi.Repositories; 
using TaskApi.Services; 

var builder = WebApplication.CreateBuilder(args); 

// Lấy chuỗi kết nối
var connectionString = builder.Configuration.GetConnectionString("Default");

if (string.IsNullOrEmpty(connectionString)) {
    throw new InvalidOperationException("Connection string 'Default' not found.");
}

// Cấu hình EF Core với MySQL
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Cấu hình CORS (Để chế độ AllowAll để test cho dễ, không bị lỗi đỏ)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Controller + Swagger 
builder.Services.AddControllers(); 
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen(); 

// [QUAN TRỌNG] Đăng ký DI cho TaskRepository và TaskService
builder.Services.AddScoped<ITaskRepository, TaskRepository>(); 
builder.Services.AddScoped<ITaskService, TaskService>(); 

var app = builder.Build(); 

// Tạo DB nếu chưa có 
using (var scope = app.Services.CreateScope()) { 
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>(); 
    db.Database.EnsureCreated(); 
} 

// Luôn bật Swagger để dễ test
app.UseSwagger();
app.UseSwaggerUI();

// 6. Kích hoạt CORS (Dùng policy "AllowAll" đã định nghĩa ở trên)
app.UseCors("AllowAll");

app.UseHttpsRedirection(); 
app.MapControllers(); 
app.Run();

// using Microsoft.EntityFrameworkCore; 
// using StudentApi.Data; 
// using StudentApi.Repositories; 
// using StudentApi.Services; 

// var builder = WebApplication.CreateBuilder(args); 
// var connectionString = builder.Configuration.GetConnectionString("Default");

// if (string.IsNullOrEmpty(connectionString)) {
//     throw new InvalidOperationException("Connection string 'Default' not found.");
// }

// // EF Core 
// builder.Services.AddDbContext<AppDbContext>(options => 
//     options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// // Controller + Swagger 
// builder.Services.AddControllers(); 
// builder.Services.AddEndpointsApiExplorer(); 
// builder.Services.AddSwaggerGen(); 

// // DI cho Repository và Service 
// builder.Services.AddScoped<IStudentRepository, StudentRepository>(); 
// builder.Services.AddScoped<IStudentService, StudentService>(); 

// // --- [MỚI] Cấu hình CORS ---
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowReactApp", policy => {
//         policy.WithOrigins("http://localhost:5173") // Địa chỉ Frontend của bạn
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//     });
// });

// var app = builder.Build(); 
 
// // Tạo DB nếu chưa có 
// using (var scope = app.Services.CreateScope()) { 
//     var db = scope.ServiceProvider.GetRequiredService<AppDbContext>(); 
//     db.Database.EnsureCreated(); 
// } 
 
// // if (app.Environment.IsDevelopment()) { 
// //     app.UseSwagger(); 
// //     app.UseSwaggerUI(); 
// // } 
// app.UseSwagger();
// app.UseSwaggerUI();
 
// // --- [MỚI] Kích hoạt CORS (Đặt trước Authorization/MapControllers) ---
// app.UseCors("AllowReactApp");

// // app.UseHttpsRedirection(); 
// app.MapControllers(); 
// app.Run();