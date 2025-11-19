namespace TaskApi.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty; // Tên Task
    public DateTime? DueDate { get; set; } // Hạn chót (có thể null)
    public string Status { get; set; } = "Đang làm"; // Mặc định là Đang làm
}