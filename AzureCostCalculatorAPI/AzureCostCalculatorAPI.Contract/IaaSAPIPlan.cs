using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureCostCalculatorAPI.Contract
{
    public class IaaSAPIPlan
    {
        public Guid IAID { get; set; }
        public string? VM { get; set; }
        public int? CPU { get; set; }
        public int? RAM { get; set; }
        public int? Storage { get; set; }
        public int? Cost { get; set; }
    }
}
