using CupCakeDream.DTO;
using CupCakeDream.Interfaces;
using CupCakeDream.Models;
using CupCakeDream.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Swashbuckle.AspNetCore.Annotations;

namespace CupCakeDream.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductController : Controller
    {
        private readonly IProductService _profileService;


        public ProductController(IProductService profileService)
        {

            _profileService = profileService;

        }

        [SwaggerOperation("Get all Products")]
        [HttpGet]
        public async Task<List<Product>> GetAll()
        {
            return await _profileService.GetAll(); 
        }

        [SwaggerOperation("Get Product by Id")]
        [HttpGet]
        public async Task<Product> GetProductById(Guid id)
        {
            return await _profileService.GetProductById(id);
        }


        [SwaggerOperation("Create Product")]
        [HttpPost]
        public async Task<Product> CreateProduct([FromBody] ProductDTO product)
        {
            return await _profileService.CreateProduct(product);
        }

        [SwaggerOperation("Update Product")]
        [HttpPut]
        public async Task<Product> UpdateProduct(Guid id, [FromBody] ProductDTO user)
        {
            return await _profileService.UpdateProduct(id, user);
        }

        [SwaggerOperation("Activate Product")]
        [HttpPut]
        public async Task<Product> ActivateProduct(Guid id)
        {
            return await _profileService.ActivateProduct(id);
        }

        [SwaggerOperation("Disable Product")]
        [HttpPut]
        public async Task<Product> DisableProduct(Guid id)
        {
            return await _profileService.DisableProduct(id);
        }

    }
}
