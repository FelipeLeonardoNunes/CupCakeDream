using CupCakeDream.Models;
using Microsoft.EntityFrameworkCore;

namespace CupCakeDream.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }
        
        public DbSet<User> users { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<Favorite> favorites { get; set; }
        public DbSet<Cart> carts { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<OrderDetails> orderDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) { 
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
            modelBuilder.Entity<User>().HasKey(x => x.Id);
            modelBuilder.Entity<Product>().HasKey(x => x.Id);
            modelBuilder.Entity<Favorite>().HasKey(x => x.Id);
            modelBuilder.Entity<Cart>().HasKey(x => x.Id);
            modelBuilder.Entity<Order>().HasKey(x => x.Id);
            modelBuilder.Entity<OrderDetails>().HasKey(x => x.Id);
            base.OnModelCreating(modelBuilder);

        }
    }
}
