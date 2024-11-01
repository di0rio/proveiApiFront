using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace proveiMvc.Models
{
    public class VendaProduto
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public int Quantidade { get; set; }

        [ForeignKey("VendaId")]
        public Guid VendaId { get; set; } = Guid.NewGuid();
        public Venda? Venda { get; set; }

        [ForeignKey("ProdutoId")]
        public Guid ProdutoId { get; set; }
        public Produto? Produto { get; set; }
    }
}
