using Binge.Domain.Models;
namespace Binge.Infrastructure.Repositories.Interface
{
    public interface ICategoryRepository 
    {
        Task<Category> GetCategoryByIdAsync(int categoryId);
    }
}
