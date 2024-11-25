using CupCakeDream.DTO;
using CupCakeDream.Models;

namespace CupCakeDream.Interfaces
{
    public interface IOrderService
    {
        Task<List<Order>> GetAll();
        Task<List<Order>> GetOrdersByUserId(Guid userId);
        Task<List<OrderDetails>> GetOrdersDetails(Guid orderId);
        Task<Order> CreateOrder(OrderDTO order);
        Task<List<OrderDetails>> CreateOrderDetails(Guid orderId, List<OrderDetailsDTO> list);
        Task<Order> UpdateOrder(Guid orderId, OrderDTO order);
    }
}
