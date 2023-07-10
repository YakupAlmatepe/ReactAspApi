using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ReactAspApi.Modals
{
    public class PersonDbContext :DbContext
    {
        public PersonDbContext(DbContextOptions<PersonDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-QO8PCJ5;initial catalog =DBAltisTask; integrated security=true;");
        }
        public DbSet<Person> People { get; set; }
    }
}
