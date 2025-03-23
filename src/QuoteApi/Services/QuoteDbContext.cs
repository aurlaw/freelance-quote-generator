using Microsoft.EntityFrameworkCore;
using QuoteApi.Models;

namespace QuoteApi.Services;

public class QuoteDbContext : DbContext
{
    public DbSet<QuoteRequest> Quotes { get; set; }

    public QuoteDbContext(DbContextOptions<QuoteDbContext> options) : base(options) {}
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<QuoteRequest>().ToTable("Quotes");
    }    
}