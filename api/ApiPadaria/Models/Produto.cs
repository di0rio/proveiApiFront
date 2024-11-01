using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace proveiMvc.Models
{
    public class Produto
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Preco { get; set; }

        [Range(0, int.MaxValue)]
        public int QuantidadeEmEstoque { get; set; }

        // Chave estrangeira
        [ForeignKey("FornecedorId")]
        public Guid FornecedorId { get; set; }
        public Fornecedor? Fornecedor { get; set; }
    }

}

