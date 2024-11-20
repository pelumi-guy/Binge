using Binge.Domain.Context;
using Binge.Domain.Models;
using Binge.Infrastructure.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
namespace Binge.Infrastructure.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly BingeContext _context;
        private readonly ILogger<CategoryRepository> _logger;
        public CategoryRepository(BingeContext context, ILogger<CategoryRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Category> GetCategoryByIdAsync(int categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);

                if (category == null)
                {
                    _logger.LogWarning($"Category with Id {categoryId} not found.");
                    return null;
                }
                return category;
        }

    }
}
