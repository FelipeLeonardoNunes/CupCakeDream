using CupCakeDream.DTO;
using CupCakeDream.Models;

namespace CupCakeDream.Interfaces
{
    public interface ICartService
    {
        Task<List<Cart>> GetCartByUserId(Guid userId);
        Task<Cart> AddProductCart(CartDTO cart);
        Task<Cart> UpdateProductCart(Guid cartId, CartDTO cart);
        Task<bool> RemoveProductCart(Cart cart);
        Task<bool> RemoveAllProductsCart(Guid userId);

    }
}
