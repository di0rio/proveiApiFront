using System.ComponentModel.DataAnnotations;

namespace proveiMvc.Models
{
    public class Cliente
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public string CPF_CNPJ { get; set; }
        public string Endereco { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public bool StatusAtivo { get; set; }

        public Cliente()
        {
            StatusAtivo = true;
        }
    }
}
