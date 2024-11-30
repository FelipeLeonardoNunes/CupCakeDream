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
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProductService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Product>> GetAll()
        {
            var list = await _context.products.ToListAsync();

            return _mapper.Map<List<Product>>(list);

        }


        public async Task<Product> GetProductById(Guid id)
        {
            var Product = await _context.products.FirstOrDefaultAsync(x => x.Id.Equals(id));

            return _mapper.Map<Product>(Product);
        }

        public async Task<Product> CreateProduct(ProductDTO Product)
        {
            try
            {
                var map = _mapper.Map<Product>(Product);

                map.Status = true;

                await _context.AddAsync(map);
                await _context.SaveChangesAsync();


                return _mapper.Map<Product>(map); ;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Product> UpdateProduct(Guid id, ProductDTO Product)
        {
            try
            {

                var oldProduct = await _context.products.FirstOrDefaultAsync(x => x.Id.Equals(id));
                var map = _mapper.Map(Product, oldProduct);
                _context.products.Update(map);
                await _context.SaveChangesAsync();

                return _mapper.Map<Product>(map);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Product> ActivateProduct(Guid id)
        {
            var Product = await _context.products.FirstOrDefaultAsync(x => x.Id.Equals(id));
            Product.Status = true;
            _context.products.Update(Product);
            await _context.SaveChangesAsync();
            return Product;
        }

        public async Task<Product> DisableProduct(Guid id)
        {
            var Product = await _context.products.FirstOrDefaultAsync(x => x.Id.Equals(id));
            Product.Status = false;
            _context.products.Update(Product);
            await _context.SaveChangesAsync();
            return Product;
        }
    }
}
