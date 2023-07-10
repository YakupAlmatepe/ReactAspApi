using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ReactAspApi.Modals;

namespace ReactAspApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {private readonly PersonDbContext _personDbContext;

        public PersonController(PersonDbContext personDbContext)
        {
            _personDbContext = personDbContext;
        }

        [HttpGet]
        [Route("GetPerson")]
        public async Task<IEnumerable<Person>> GetPerson()
        {
            return await _personDbContext.People.ToListAsync();

        }
        [HttpPost]
        [Route("AddPerson")]
        public async Task<Person> AddPerson(Person person)
        {
            _personDbContext.People.Add(person);
            await _personDbContext.SaveChangesAsync();
            return person;

        }
        [HttpPut]
        [Route("UpdatePerson/{id}")]
        public async Task<Person> UpdatePerson(Person person)
        {
            _personDbContext.Entry(person).State = EntityState.Modified;
            await _personDbContext.SaveChangesAsync();
            return person;

        }
        [HttpDelete]
        [Route("DeletePerson/{id}")]
        public bool DeletePerson(int id)
        {
            bool a = false;
            var person = _personDbContext.People.Find(id);
            if (person !=null)
            {
                a = true;
                _personDbContext.Entry(person).State = EntityState.Deleted;
                _personDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
         

        }
    }
    
}
