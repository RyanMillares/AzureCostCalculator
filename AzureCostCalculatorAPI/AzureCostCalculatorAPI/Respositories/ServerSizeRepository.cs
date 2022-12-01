using AzureCostCalculatorAPI.Contract.Entities;
using Dapper;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace AzureCostCalculatorAPI.Respositories
{
    public class ServerSizeRepository : IServerSizeRepository
    {
        private string baseQuery = "select * from ServerSizes";
        private readonly string _connectionString;
        public ServerSizeRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("SqlConnection");
        }

        // Returns a list of all the Server Sizes
        public async Task<IEnumerable<ServerSize>> GetServerSizes(bool sorted)
        {
            string query = baseQuery;
            if (sorted)
            {
                query = $"{baseQuery} order by servers";
            }
            using var conn = new SqlConnection(_connectionString);
            var serverSizes = await conn.QueryAsync<ServerSize>(query);
            return serverSizes;
        }

        // Returns a list of Sizes of the Servers  
        public async Task<IEnumerable<ServerSize>> GetDistinctSizes()
        {
            using var conn = new SqlConnection(_connectionString);
            var sizes = await conn.QueryAsync<ServerSize>("select distinct size from dbo.ServerSizes");
            return sizes;
        }

        // Returns a list of Servers by Size 
        public async Task<IEnumerable<ServerSize>> GetServersBySize(string serverSize)
        {
            using var conn = new SqlConnection(_connectionString);
            var serverSizes = await conn.QueryAsync<ServerSize>(
                $"{baseQuery} where size = @serverSize",
                new { serverSize }
                );
            return serverSizes;
        }
        // Creates a Server
        public async void CreateServerSize(ServerSize serverSize)
        {
            if (serverSize is null)
            {
                throw new ArgumentNullException(nameof(serverSize));
            }
            var query = @"insert into dbo.ServerSizes(ssid, size, servers)
                            values(default, @size, @servers)";
            using var conn = new SqlConnection(_connectionString);
            await conn.QueryAsync<ServerSize>(query, serverSize);
        }

        // Delete a Server
        public async void DeleteServerSize(Guid id)
        {
            var query = @$"delete from ServerSizes where ssid = '{id}'";
            using var conn = new SqlConnection(_connectionString);
            await conn.QueryAsync<ServerSize>(query);
        }
    }
}
