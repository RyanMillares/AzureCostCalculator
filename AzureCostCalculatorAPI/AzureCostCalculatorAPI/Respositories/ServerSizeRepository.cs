using AzureCostCalculatorAPI.Contract.Entities;
using Dapper;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace AzureCostCalculatorAPI.Respositories
{
    public class ServerSizeRepository : IServerSizeRepository
    {
        private readonly string _connectionString;
        public ServerSizeRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("SqlConnection");
        }

        // Returns a list of all the Server Sizes
        public async Task<IEnumerable<ServerSize>> GetServerSizes()
        {
            using var conn = new SqlConnection(_connectionString);
            var data = await conn.QueryAsync<ServerSize>("select * from ServerSizes");
            return data;
        }

        // Returns a list of all the Server Sizes
        public async Task<IEnumerable<ServerSize>> GetSorted()
        {
            using var conn = new SqlConnection(_connectionString);
            var data = await conn.QueryAsync<ServerSize>("select * from ServerSizes order by servers");
            return data;
        }

        // Returns a list of Sizes of the Servers  
        public async Task<IEnumerable<ServerSize>> GetDistinctSize()
        {
            using var conn = new SqlConnection(_connectionString);
            var data = await conn.QueryAsync<ServerSize>("SELECT DISTINCT SIZE FROM dbo.ServerSizes");
            return data;
        }

        // Returns a list of Servers by Size 
        public async Task<IEnumerable<ServerSize>> GetServerBySize(string serverSize)
        {
            using var conn = new SqlConnection(_connectionString);
            var data = await conn.QueryAsync<ServerSize>("select * from ServerSizes where size = @serverSize", new { serverSize });
            return data;
        }
        // Creates a Servers
        public async void CreateServerSize(ServerSize serversize)
        {
            if (serversize is null)
            {
                throw new ArgumentNullException(nameof(serversize));
            }
            var query = @"INSERT INTO dbo.ServerSizes(ssid, size, servers)
                            VALUES(default, @size, @servers)";
            using var conn = new SqlConnection(_connectionString);
            await conn.QueryAsync<ServerSize>(query, serversize);
        }
    }
}
