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
    public class UserController : Controller
    {
        private readonly IUserService _userService;


        public UserController(IUserService userService)
        {

            _userService = userService;

        }


        [SwaggerOperation("Login email and password with md5")]
        [HttpGet]
        public async Task<IActionResult> Login(string Email, string Password)
        {
            var user = await _userService.Login(Email, Password);
            if(user != null)
                return Ok(user);

            return Ok("User not found");

        }   


        [SwaggerOperation("Get all Users")]
        [HttpGet]
        public async Task<List<ReturnUserDTO>> GetAll()
        {
            return await _userService.GetAll(); 
        }

        [SwaggerOperation("Get User by Id")]
        [HttpGet]
        public async Task<ReturnUserDTO> GetUserById(Guid id)
        {
            return await _userService.GetUserById(id);
        }


        [SwaggerOperation("Create User")]
        [HttpPost]
        public async Task<ReturnUserDTO> CreateUser([FromBody] UserDTO user)
        {
            return await _userService.CreateUser(user);
        }

        [SwaggerOperation("Update User")]
        [HttpPut]
        public async Task<ReturnUserDTO> UpdateUser(Guid id, [FromBody] UserDTO user)
        {
            return await _userService.UpdateUser(id, user);
        }


        [SwaggerOperation("Activate User")]
        [HttpPut]
        public async Task<ReturnUserDTO> ActivateUser(Guid id)
        {
            return await _userService.ActivateUser(id);
        }

        [SwaggerOperation("Disable User")]
        [HttpPut]
        public async Task<ReturnUserDTO> DisableUser(Guid id)
        {
            return await _userService.DisableUser(id);
        }

    }
}
