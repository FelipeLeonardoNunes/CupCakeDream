namespace CupCakeDream.DTO
{
    public class OrderCompleteDTO
    {
        public OrderDTO orderDTO { get; set; }
        public List<OrderDetailsDTO> OrderDetailDTOs { get; set; }

    }
}
