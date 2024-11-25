using CupCakeDream.DTO;
using CupCakeDream.Models;

namespace CupCakeDream.Interfaces
{
    public interface IUserService
    {
        Task<List<ReturnUserDTO>> GetAll();
        Task<ReturnUserDTO> GetUserById(Guid id);
        Task<ReturnUserDTO> CreateUser(UserDTO user);
        Task<ReturnUserDTO> UpdateUser(Guid id, UserDTO user);
        Task<ReturnUserDTO> ActivateUser(Guid id);
        Task<ReturnUserDTO> DisableUser(Guid id);
        Task<ReturnUserDTO> Login(string email, string password);
    }
}
