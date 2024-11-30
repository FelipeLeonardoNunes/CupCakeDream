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
    public class FavoriteController : Controller
    {
        private readonly IUserService _userService;
        private readonly IProductService _productService;
        private readonly IFavoriteService _favoriteService;



        public FavoriteController(IUserService userService, IProductService productService, IFavoriteService favoriteService)
        {

            _userService = userService;
            _productService = productService;
            _favoriteService = favoriteService;
        }


        [SwaggerOperation("Get Favorite by UserId")]
        [HttpGet]
        public async Task<List<Favorite>> GetFavoriteByUserId(Guid userId)
        {
            return await _favoriteService.GetFavoriteByUserId(userId);
        }


        [SwaggerOperation("Create User")]
        [HttpPost]
        public async Task<Favorite> CreateFavorite([FromBody] FavoriteDTO favorite)
        {
            return await _favoriteService.CreateFavorite(favorite);
        }

        [SwaggerOperation("Create User")]
        [HttpDelete]
        public async Task<IActionResult> DeleteFavorite([FromBody] FavoriteDTO favorite)
        {
            var result = await _favoriteService.DeleteFavorite(favorite);
            return Ok();
        }


    }
}
