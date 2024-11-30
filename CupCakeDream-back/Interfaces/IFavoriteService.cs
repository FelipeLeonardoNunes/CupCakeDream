using CupCakeDream.DTO;
using CupCakeDream.Models;

namespace CupCakeDream.Interfaces
{
    public interface IFavoriteService
    {
        Task<List<Favorite>> GetFavoriteByUserId(Guid userId);
        Task<Favorite> CreateFavorite(FavoriteDTO favorite);
        Task<bool> DeleteFavorite(FavoriteDTO favorite);
    }
}
