using System.ComponentModel.DataAnnotations.Schema;

namespace proveiMvc.Models
{
    public class Venda
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public DateTime DataEmissao { get; set; } = DateTime.Now;
        public decimal ValorTotal { get; set; }

        [ForeignKey("ClienteId")]
        public Guid ClienteId { get; set; }
        public Cliente? Cliente { get; set; }

        // Remova o campo ProdutoId, pois estamos lidando com uma lista de produtos na venda
        public ICollection<VendaProduto>? Produtos { get; set; } = new List<VendaProduto>(); // Relacionamento muitos-para-muitos
    }
}

