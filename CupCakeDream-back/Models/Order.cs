using CupCakeDream.Enums;

namespace CupCakeDream.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string OrderNumber { get; set; }
        public string PaymentMethod { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public double Total { get; set; }
        public Status OrderStatus { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastUpdated { get; set; }

    }
}