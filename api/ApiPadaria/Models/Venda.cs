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

            [ForeignKey("ProdutoId")]
            public Guid ProdutoId { get; set; }
            public Produto? Produto { get; set; }

            [ForeignKey("VendaProdutoId")]
            public List<VendaProduto>? Produtos { get; set; }
    }
}
