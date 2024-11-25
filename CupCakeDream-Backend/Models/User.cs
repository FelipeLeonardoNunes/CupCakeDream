namespace CupCakeDream.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string Cpf { get; set; }
        public string PostalCode { get; set; }
        public string Role { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}