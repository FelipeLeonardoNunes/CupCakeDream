using AutoMapper;
using CupCakeDream.Data;
using CupCakeDream.DTO;
using CupCakeDream.Interfaces;
using CupCakeDream.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph;
using User = CupCakeDream.Models.User;

namespace CupCakeDream.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ReturnUserDTO>> GetAll()
        {
            var list = await _context.users.ToListAsync();

            return _mapper.Map<List<ReturnUserDTO>>(list);

        }


        public async Task<ReturnUserDTO> GetUserById(Guid id)
        {
            var user = await _context.users.FirstOrDefaultAsync(x => x.Id.Equals(id));

            return _mapper.Map<ReturnUserDTO>(user);
        }

        public async Task<ReturnUserDTO> Login(string email, string password)
        {
            var user = await _context.users.FirstOrDefaultAsync(x => x.Email.Equals(email) && x.Password.Equals(password));
            return _mapper.Map<ReturnUserDTO>(user);
        }

        public async Task<ReturnUserDTO> CreateUser(UserDTO user)
        {
            try
            {
                var date = DateTime.UtcNow;
                var map = _mapper.Map<User>(user);

                map.Status = true;
                map.CreatedDate = date;

                await _context.AddAsync(map);
                await _context.SaveChangesAsync();


                return _mapper.Map<ReturnUserDTO>(map); ;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ReturnUserDTO> UpdateUser(Guid id, UserDTO user)
        {
            try
            {

                var oldUser = await _context.users.FirstOrDefaultAsync(x => x.Id.Equals(id));
                var map = _mapper.Map(user, oldUser);
                _context.users.Update(map);
                await _context.SaveChangesAsync();

                return _mapper.Map<ReturnUserDTO>(map);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ReturnUserDTO> ActivateUser(Guid id)
        {
            var user = await _context.users.FirstOrDefaultAsync(x => x.Id.Equals(id));
            user.Status = true;
            _context.users.Update(user);
            await _context.SaveChangesAsync();
            return _mapper.Map<ReturnUserDTO>(user);
        }

        public async Task<ReturnUserDTO> DisableUser(Guid id)
        {
            var user = await _context.users.FirstOrDefaultAsync(x => x.Id.Equals(id));
            user.Status = false;
            _context.users.Update(user);
            await _context.SaveChangesAsync();
            return _mapper.Map<ReturnUserDTO>(user);
        }
    }
}
