using System.Security.Permissions;
using Microsoft.EntityFrameworkCore;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddDbContext<ToDoDbContext>(options =>
//     options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"), 
//                      new MySqlServerVersion(new Version(8, 0, 40))));
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration["CONNECTIONSTRINGS_TODO_DB"], 
                     new MySqlServerVersion(new Version(8, 0, 40))));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigin",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});                     

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAllOrigin");


    app.UseSwagger();
    app.UseSwaggerUI();


app.MapGet("/", () => "Hello World!");

app.MapGet("/todos", async (ToDoDbContext db) =>
{
    return await db.Items.ToListAsync();
});

app.MapPost("/todos", async (ToDoDbContext db,Item item)=>{
     db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{item.Id}", item);
});

app.MapPut("/todos/{id}", async (int id, ToDoDbContext db, Item updatedItem) =>
{
    var item = await db.Items.FindAsync(id);
    if (item == null)
    {
        return Results.NotFound();
    }
    
    item.Name = updatedItem.Name;
    item.IsComplete = updatedItem.IsComplete;

    await db.SaveChangesAsync();
    return Results.Ok("item updatedApi.csproj sucssesfully");
});

app.MapDelete("/todos/{id}",async (int id,ToDoDbContext db)=>{
    var item=await db.Items.FindAsync(id);
    if(item==null)
    return Results.NotFound();
    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.Ok("item deleted sucssesfully");

    
});

app.Run();
