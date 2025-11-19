using Microsoft.EntityFrameworkCore; 
using TaskApi.Data; 
using TaskApi.Models; 
using System.Linq.Expressions; 

namespace TaskApi.Repositories; 

public class TaskRepository : ITaskRepository 
{ 
    private readonly AppDbContext _db; 
    public TaskRepository(AppDbContext db) => _db = db; 
    public async Task<TaskItem?> GetByIdAsync(int id) => 
        await _db.TaskItems.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id); 
    public async Task<IReadOnlyList<TaskItem>> ListAsync(Expression<Func<TaskItem, bool>>? predicate = null) { 
        IQueryable<TaskItem> query = _db.TaskItems.AsNoTracking(); 
        if (predicate != null) 
            query = query.Where(predicate);
        return await query.OrderByDescending(t => t.Id).ToListAsync(); 
    } 
    public async Task AddAsync(TaskItem entity) => await _db.TaskItems.AddAsync(entity); 
    public void Update(TaskItem entity) => _db.TaskItems.Update(entity); 
    public void Remove(TaskItem entity) => _db.TaskItems.Remove(entity); 
    public Task<int> SaveChangesAsync() => _db.SaveChangesAsync(); 
    public Task<bool> ExistsByTitleAsync(string title) => 
        _db.TaskItems.AnyAsync(t => t.Title == title); 
}