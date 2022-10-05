using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AzureCostCalculatorAPI.Contract;
using AzureCostCalculatorAPI.Controllers;

namespace AzureCostCalculatorAPI.Contexts
{
    public class AzureCostCalculatorContext : IdentityDbContext<UserTest>
    {
        public AzureCostCalculatorContext(DbContextOptions<AzureCostCalculatorContext> options) : base(options)
        {
        }
        public DbSet<PaaSWebPlan> PaasWebs { get; set; }
        public DbSet<PaaSAppPlan> PaasApps { get; set; }
        public DbSet<PaaSDBPlan> PaasDbs { get; set; }
        public DbSet<IaaSWebPlan> IaasWebs { get; set; }
        public DbSet<IaaSAPIPlan> IaasApis { get; set; }
        public DbSet<IaaSDBPlan> IaasDbs { get; set; }
    }
}
