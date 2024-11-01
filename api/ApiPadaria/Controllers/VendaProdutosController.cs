using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiPadaria.Data;
using proveiMvc.Models;

namespace ApiPadaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendaProdutosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VendaProdutosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/VendaProdutos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VendaProduto>>> GetVendaProduto()
        {
            return await _context.VendaProduto.ToListAsync();
        }

        // GET: api/VendaProdutos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VendaProduto>> GetVendaProduto(Guid id)
        {
            var vendaProduto = await _context.VendaProduto.FindAsync(id);

            if (vendaProduto == null)
            {
                return NotFound();
            }

            return vendaProduto;
        }

        // PUT: api/VendaProdutos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendaProduto(Guid id, VendaProduto vendaProduto)
        {
            if (id != vendaProduto.Id)
            {
                return BadRequest();
            }

            _context.Entry(vendaProduto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendaProdutoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/VendaProdutos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VendaProduto>> PostVendaProduto(VendaProduto vendaProduto)
        {
            _context.VendaProduto.Add(vendaProduto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVendaProduto", new { id = vendaProduto.Id }, vendaProduto);
        }

        // DELETE: api/VendaProdutos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendaProduto(Guid id)
        {
            var vendaProduto = await _context.VendaProduto.FindAsync(id);
            if (vendaProduto == null)
            {
                return NotFound();
            }

            _context.VendaProduto.Remove(vendaProduto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VendaProdutoExists(Guid id)
        {
            return _context.VendaProduto.Any(e => e.Id == id);
        }
    }
}
