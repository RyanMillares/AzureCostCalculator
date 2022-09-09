using Microsoft.Extensions.Configuration.Json;
//using Microsoft.Extensions.Configuration.Binder;

namespace AzureCostCalculatorAPI.Controllers
{
    public class ConfigHandler
    {
        public static string GetByName(string configKeyName)
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            IConfigurationSection section = config.GetSection(configKeyName);

            return section.Value;
        }
    }
}
