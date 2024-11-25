using AutoMapper;
using CupCakeDream.Data;
using CupCakeDream.DTO;
using CupCakeDream.Interfaces;
using CupCakeDream.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph;
using Favorite = CupCakeDream.Models.Favorite;

namespace CupCakeDream.Services
{
    public class FavoriteService : IFavoriteService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public FavoriteService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Favorite>> GetFavoriteByUserId(Guid userId)
        {
            var Favorite = await _context.favorites.Where(x => x.UserId.Equals(userId)).ToListAsync();

            return Favorite;
        }

        public async Task<Favorite> CreateFavorite(FavoriteDTO favorite)
        {
            try
            {
                var map = _mapper.Map<Favorite>(favorite);
                await _context.AddAsync(map);
                await _context.SaveChangesAsync();


                return map;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteFavorite(FavoriteDTO favorite)
        {
            var Favorite = await _context.favorites.FirstOrDefaultAsync(x => x.UserId.Equals(favorite.UserId) && x.ProductId.Equals(favorite.ProductId));
            _context.favorites.Remove(Favorite);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
