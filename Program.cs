var builder = WebApplication.CreateBuilder(args);

// Dodanie MVC (kontrolery + widoki)
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Konfiguracja potoku HTTP
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// 👉 KALKULATOR JAKO STRONA GŁÓWNA
app.MapGet("/", context =>
{
    context.Response.Redirect("/Calculator");
    return Task.CompletedTask;
});

// Domyślny routing MVC
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
