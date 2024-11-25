namespace CupCakeDream.DTO
{
    public class CartDTO
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }

    }
}
