using AutoMapper;
using CupCakeDream.Data;
using CupCakeDream.DTO;
using CupCakeDream.Interfaces;
using CupCakeDream.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph;
using Product = CupCakeDream.Models.Product;

namespace CupCakeDream.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OrderService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



        public async Task<List<Order>> GetAll()
        {
            return await _context.orders.ToListAsync();
        }


        public async Task<List<Order>> GetOrdersByUserId(Guid userId)
        {
            var list = await _context.orders.Where(x => x.UserId.Equals(userId)).ToListAsync();

            return list;
        }

        public async Task<List<OrderDetails>> GetOrdersDetails(Guid orderId)
        {
            var list = await _context.orderDetails.Where(x => x.OrderId.Equals(orderId)).ToListAsync();

            return list;
        }

        public async Task<Order> CreateOrder(OrderDTO order)
        {

            var mapOrder = _mapper.Map<Order>(order);
            mapOrder.OrderStatus = Enums.Status.Pendente;
            mapOrder.Created = DateTime.UtcNow;
            mapOrder.LastUpdated = DateTime.UtcNow;
            await _context.orders.AddAsync(mapOrder);
            await _context.SaveChangesAsync();
                     

            return mapOrder;
        }


        public async Task<List<OrderDetails>> CreateOrderDetails(Guid orderId, List<OrderDetailsDTO> list)
        {

            var mapOrder = _mapper.Map<List<OrderDetails>>(list);
            List<OrderDetails> orders = new List<OrderDetails>();
            foreach (var item in mapOrder)
            {
                item.OrderId = orderId;
                await _context.orderDetails.AddAsync(item);
                await _context.SaveChangesAsync();
                orders.Add(item);
            }

            return orders;
        }

        public async Task<Order> UpdateOrder(Guid orderId, OrderDTO order)
        {
            try
            {

                var oldOrder = await _context.orders.FirstOrDefaultAsync(x => x.Id.Equals(orderId));
                var map = _mapper.Map(order, oldOrder);
                _context.orders.Update(map);
                await _context.SaveChangesAsync();

                return map;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
