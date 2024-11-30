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
    public class CartController : Controller
    {

        private readonly ICartService _cartService;



        public CartController(ICartService cartService)
        {

            _cartService = cartService;
            
        }


        [SwaggerOperation("Get Cart by UserId")]
        [HttpGet]
        public async Task<List<Cart>> GetCartByUserId(Guid userId)
        {
            return await _cartService.GetCartByUserId(userId);
        }


        [SwaggerOperation("Add product on the cart of the User")]
        [HttpPost]
        public async Task<Cart> AddProductCart([FromBody] CartDTO cart)
        {
            return await _cartService.AddProductCart(cart);
        }

        [SwaggerOperation("Update product on the cart of the User")]
        [HttpPost]
        public async Task<Cart> UpdateProductCart(Guid cartId, [FromBody] CartDTO cart)
        {
            return await _cartService.UpdateProductCart(cartId, cart);
        }

        [SwaggerOperation("Remove product of the user cart")]
        [HttpDelete]
        public async Task<IActionResult> RemoveProductCart([FromBody] Cart cart)
        {
            var result = await _cartService.RemoveProductCart(cart);
            return Ok();
        }

        [SwaggerOperation("Remove all products of the user cart")]
        [HttpDelete]
        public async Task<IActionResult> RemoveAllProductsCart(Guid userId)
        {
            var result = await _cartService.RemoveAllProductsCart(userId);
            return Ok();
        }


    }
}
