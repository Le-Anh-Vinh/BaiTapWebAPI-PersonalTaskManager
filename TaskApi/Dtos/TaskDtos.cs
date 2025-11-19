namespace TaskApi.Dtos; 

public record TaskDto(int Id, string Title, DateTime? DueDate, string Status); 

public class CreateTaskDto 
{ 
    public string Title { get; set; } = default!; 
    public DateTime? DueDate { get; set; } 
} 

public class UpdateTaskDto 
{ 
    public string Title { get; set; } = default!; 
    public DateTime? DueDate { get; set; } 
    public string Status { get; set; } = default!; 
}