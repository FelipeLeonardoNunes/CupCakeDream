using AutoMapper;
using CupCakeDream.DTO;
using CupCakeDream.Models;

namespace CupCakeDream.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() { 
        
        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<User, ReturnUserDTO>().ReverseMap();
        CreateMap<Product, ProductDTO>().ReverseMap();
        CreateMap<Favorite, FavoriteDTO>().ReverseMap();
        CreateMap<Cart, CartDTO>().ReverseMap();
        CreateMap<Order, OrderDTO>().ReverseMap();
        CreateMap<OrderDetails, OrderDetailsDTO>().ReverseMap();

        }
    }
}
