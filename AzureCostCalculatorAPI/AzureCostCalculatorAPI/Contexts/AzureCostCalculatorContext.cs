using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AzureCostCalculatorAPI.Contract;
using AzureCostCalculatorAPI.Controllers;
using AzureCostCalculatorAPI.Contract.Entities;

namespace AzureCostCalculatorAPI.Contexts
{
    public class AzureCostCalculatorContext : IdentityDbContext<UserTest>
    {
        public AzureCostCalculatorContext(DbContextOptions<AzureCostCalculatorContext> options) : base(options)
        {
        }
        public DbSet<PaasWebPlan> PaasWebs { get; set; }
        public DbSet<PaasAppPlan> PaasApps { get; set; }
        public DbSet<PaasDbPlan> PaasDbs { get; set; }
        public DbSet<IaasWebPlan> IaasWebs { get; set; }
        public DbSet<IaasApiPlan> IaasApis { get; set; }
        public DbSet<IaasDbPlan> IaasDbs { get; set; }
    }
}
