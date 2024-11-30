using CupCakeDream.DTO;
using CupCakeDream.Models;

namespace CupCakeDream.Interfaces
{
    public interface IProductService
    {
        Task<List<Product>> GetAll();
        Task<Product> GetProductById(Guid id);
        Task<Product> CreateProduct(ProductDTO product);
        Task<Product> UpdateProduct(Guid id, ProductDTO product);
        Task<Product> ActivateProduct(Guid id);
        Task<Product> DisableProduct(Guid id);
    }
}
