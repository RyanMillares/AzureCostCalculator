using AzureCostCalculatorAPI.Contract.Entities;
using Dapper;
using Microsoft.Data.SqlClient;

namespace AzureCostCalculatorAPI.Respositories
{
    public class PaasWebRepository : IPaasWebRepository
    {
        public readonly string _connectionString;

        public PaasWebRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("SqlConnection");
        }

        //Returns a list of all PaaS Web Plans
        public async Task<IEnumerable<PaasWebPlan>> GetPaasWebPlans()
        {
            using var conn = new SqlConnection(_connectionString);
            var data = await conn.QueryAsync<PaasWebPlan>("select * from PaaS_Web");
            return data;
        }

        public async void CreatePaasWebPlan(PaasWebPlan plan)
        {
            if (plan is null)
            {
                throw new ArgumentNullException(nameof(plan));
            }

            var query = @"INSERT INTO dbo.PaaS_Web (pwid, name, cpu, ram, storage, cost)
                        VALUES (default, @name, @cpu, @ram, @storage, @cost)";
            using var conn = new SqlConnection(_connectionString);
            await conn.QueryAsync(query, plan);
        }
    }
}