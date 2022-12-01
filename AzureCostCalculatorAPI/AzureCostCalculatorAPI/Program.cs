using AzureCostCalculatorAPI.Mappings;
using AzureCostCalculatorAPI.Respositories;

var corsPolicy = "AnyOrigin";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, builder =>
    {
        builder.AllowAnyOrigin();
        builder.WithOrigins(
            "localhost:3000",
            "*",
            "http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;
}).AddXmlDataContractSerializerFormatters();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(DefaultMappingProfile));
builder.Services.AddScoped<IIaasApiRepository, IaasApiRepository>();
builder.Services.AddScoped<IPaasWebRepository, PaasWebRepository>();
builder.Services.AddScoped<IServerSizeRepository, ServerSizeRepository>();
builder.Services.AddScoped<IIaasWebRepository, IaasWebRepository>();

// Configure the HTTP request pipeline.
var app = builder.Build();

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
    app.UseExceptionHandler("/error-development");
}
else
{
    app.UseExceptionHandler("/error");
}

app.UseCors(corsPolicy);
app.UseAuthorization();
app.MapControllers();
app.Run();
