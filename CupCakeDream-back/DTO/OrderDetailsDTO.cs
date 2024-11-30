﻿namespace CupCakeDream.DTO
{
    public class OrderDetailsDTO
    {
        public Guid UserId { get; set; }
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }

    }
}