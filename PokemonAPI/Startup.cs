
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(); // Add CORS services
        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage(); // Use developer exception page only in development
    }

    app.UseRouting();

    app.UseCors(options =>
    {
        options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });

    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}

}
