using System.ComponentModel.DataAnnotations;

namespace ReactAspApi.Modals
{
    public class Person
    {
        [Key]
        public int ID { get; set; }
        public String Name { get; set; }
        public String Surname { get; set; }
        public String Adress { get; set; }
        public String Description { get; set; }
    }
}
