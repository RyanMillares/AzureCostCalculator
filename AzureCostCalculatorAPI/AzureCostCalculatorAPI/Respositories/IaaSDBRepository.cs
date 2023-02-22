using AzureCostCalculatorAPI.Contract.Entities;
using Dapper;
using System.Data.SqlClient;

namespace AzureCostCalculatorAPI.Respositories
{
    public class IaaSDBRepository : IIaaSDBRepository
    {
        private readonly string _connectionString;
        public IaaSDBRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("SqlConnection");
        }
        public async Task<IEnumerable<IaasDbPlan>> GetIaasDbPlans()
        {
            using var conn = new SqlConnection(_connectionString);
            var data = await conn.QueryAsync<IaasDbPlan>("select * from IaaS_DB");
            return data;
        }

        public async void CreateIaasDbPlan(IaasDbPlan plan)
        {
            if (plan is null)
            {
                throw new ArgumentNullException(nameof(plan));
            }

            var query = @"INSERT INTO dbo.IaaS_DB (idid, vm, cpu, ram, storage, cost)
                        VALUES (default, @vm, @cpu, @ram, @storage, @cost)";
            using var conn = new SqlConnection(_connectionString);
            await conn.QueryAsync<IaasDbPlan>(query, plan);
        }
    }
}
