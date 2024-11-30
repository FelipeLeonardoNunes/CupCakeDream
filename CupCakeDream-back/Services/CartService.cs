using AutoMapper;
using CupCakeDream.Data;
using CupCakeDream.DTO;
using CupCakeDream.Interfaces;
using CupCakeDream.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph;
using Product = CupCakeDream.Models.Product;

namespace CupCakeDream.Services
{
    public class CartService : ICartService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CartService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Cart>> GetCartByUserId(Guid userId)
        {
            var list = await _context.carts.Where(x => x.UserId.Equals(userId)).ToListAsync();

            return list;
        }

        public async Task<Cart> AddProductCart(CartDTO cart)
        {
            try
            {
                var map = _mapper.Map<Cart>(cart);
                await _context.AddAsync(map);
                await _context.SaveChangesAsync();


                return map;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Cart> UpdateProductCart(Guid cartId, CartDTO cart)
        {
            try
            {
                var oldProduct = await _context.carts.FirstOrDefaultAsync(x => x.Id.Equals(cartId));
                var map = _mapper.Map(cart, oldProduct);
                _context.carts.Update(map);
                await _context.SaveChangesAsync();
                return map;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> RemoveProductCart(Cart cart)
        {
            var result = await _context.carts.FirstOrDefaultAsync(x => x.Id.Equals(cart.Id));
            _context.carts.Remove(result);
            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> RemoveAllProductsCart(Guid userId)
        {
            var list = await _context.carts.Where(x => x.UserId.Equals(userId)).ToListAsync();

            foreach (var cart in list)
            {
                _context.carts.Remove(cart);
                await _context.SaveChangesAsync();
            }

            return true;
        }

    }
}
