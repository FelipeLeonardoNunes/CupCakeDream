using CupCakeDream.DTO;
using CupCakeDream.Interfaces;
using CupCakeDream.Models;
using CupCakeDream.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using Swashbuckle.AspNetCore.Annotations;

namespace CupCakeDream.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class OrderController : Controller
    {

        private readonly IOrderService _orderService;



        public OrderController(IOrderService orderService)
        {

            _orderService = orderService;

        }

        [SwaggerOperation("Get all Users")]
        [HttpGet]
        public async Task<List<Order>> GetAll()
        {
            return await _orderService.GetAll();
        }


        [SwaggerOperation("Get Orders by UserId")]
        [HttpGet]
        public async Task<List<Order>> GetOrdersByUserId(Guid userId)
        {
            return await _orderService.GetOrdersByUserId(userId);
        }


        [SwaggerOperation("Get Order Details by orderId")]
        [HttpGet]
        public async Task<List<OrderDetails>> GetOrdersDetails(Guid orderId)
        {
            return await _orderService.GetOrdersDetails(orderId);
        }



        [SwaggerOperation("Create order and order details")]
        [HttpPost]
        public async Task<Order> CreateOrder([FromBody] OrderCompleteDTO orderComplete)
        {


            var order = await _orderService.CreateOrder(orderComplete.orderDTO);

            await _orderService.CreateOrderDetails(order.Id, orderComplete.OrderDetailDTOs);


            return order;
        }

        [SwaggerOperation("Create order and order details")]
        [HttpPut]
        public async Task<Order> UpdateOrder(Guid orderId, [FromBody] OrderDTO order)
        {

            var result = await _orderService.UpdateOrder(orderId, order);

            return result;
        }

    }
}
