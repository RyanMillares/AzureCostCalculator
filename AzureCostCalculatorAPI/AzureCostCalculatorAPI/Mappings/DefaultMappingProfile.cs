﻿using AutoMapper;
using AzureCostCalculatorAPI.DTOs;
using AzureCostCalculatorAPI.Contract.Entities;

namespace AzureCostCalculatorAPI.Mappings
{
    public class DefaultMappingProfile : Profile
    {
        public DefaultMappingProfile()
        {
            CreateMap<IaasApiPlanGetDto, IaasApiPlan>().ReverseMap();
            CreateMap<IaasApiPlanCreateDto, IaasApiPlan>().ReverseMap();
        }
    }
}
