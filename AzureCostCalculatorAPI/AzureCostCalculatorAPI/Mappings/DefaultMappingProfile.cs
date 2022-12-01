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
            CreateMap<PaasWebPlanGetDto, PaasWebPlan>().ReverseMap();
            CreateMap<PaasWebPlanCreateDTO, PaasWebPlan>().ReverseMap();
            CreateMap<ServerSizeGetDto, ServerSize>().ReverseMap();
            CreateMap<ServerSizeCreateDto, ServerSize>().ReverseMap();
        }
    }
}
