using AutoMapper;
using AutoMapper.EquivalencyExpression;

namespace CupCakeDream.Mapper
{
    public class AutoMapperConfig
    {
        public static MapperConfiguration RegisterMappings() 
        {
            return new MapperConfiguration(cfg =>
            {
                cfg.AddCollectionMappers();
                cfg.AddProfile(typeof(MappingProfile));
            });
        
        }


    }
}
